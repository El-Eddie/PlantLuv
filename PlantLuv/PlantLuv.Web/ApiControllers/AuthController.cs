using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PlantLuv.Web.Auth;
using PlantLuv.Web.Filters;
using PlantLuv.Web.Models;
using PlantLuv.Web.Models.Auth;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace PlantLuv.Web.ApiControllers
{
    public class AuthController : Controller
    {
        private readonly UserManager<PlantLuvIdentityUser> _userManager;
        private readonly IJwtFactory _jwtFactory;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthController> _logger;
        private readonly MicrosoftAuthSettings _microsoftAuthSettings;

        public AuthController(UserManager<PlantLuvIdentityUser> userManager,
            IJwtFactory jwtFactory,
            IConfiguration configuration,
            ILogger<AuthController> logger,
            IOptions<MicrosoftAuthSettings> microsoftAuthSettings)
        {
            _userManager = userManager;
            _jwtFactory = jwtFactory;
            _configuration = configuration;
            _logger = logger;
            _microsoftAuthSettings = microsoftAuthSettings.Value;
        }

        [HttpGet("external/microsoft")]
        public IActionResult GetMicrosoft()
        {
            return Ok(new
            {   //this is the public application id, don't return the secret 'Password' here!
                client_id = _microsoftAuthSettings.ClientId,
                scope = "https://graph.microsoft.com/user.read",
                state = "" //arbitrary state to return again for this user
            });
        }

        [HttpPost("external/microsoft")]
        public async Task<IActionResult> PostMicrosoft([FromBody] MicrosoftAuthViewModel model)
        {
            var verifier = new MicrosoftAuthVerifier<AuthController>(_microsoftAuthSettings, _configuration["HttpHost"] + (model.BaseHref ?? "/"), _logger);
            var profile = await verifier.AcquireUser(model.AccessToken);

            if (!profile.IsSuccessful)
            {
                _logger.LogWarning("ExternalLoginCallback() unknown error at external login provider, {profile.Error.Message}", profile.Error.Message);
                return new ValidationFailedResult(profile.Error.Message, StatusCodes.Status400BadRequest);
            }
            var info = new UserLoginInfo("Microsoft", profile.Id, "Microsoft");
            if (info == null || info.ProviderKey == null || info.LoginProvider == null)
            {
                _logger.LogWarning("ExternalLoginCallback() unknown error at external login provider");
                return new ValidationFailedResult("Unknown error at external login provider", StatusCodes.Status400BadRequest);
            }

            if (string.IsNullOrWhiteSpace(profile.Mail))
            {
                return new ValidationFailedResult("Email address not available from Login provider, cannot proceed.", StatusCodes.Status403Forbidden);
            }

            // ready to create the local user account (if necessary) and jwt
            var user = await _userManager.FindByEmailAsync(profile.Mail);
            if (user == null)
            {
                var appUser = new PlantLuvIdentityUser
                {
                    Name = profile.DisplayName,
                    Email = profile.Mail,
                    UserName = profile.Mail,
                    PhoneNumber = profile.MobilePhone
                };

                var password = Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Substring(0, 8) + "#1aA";
                // #1aA ensures all required character types will be in the random password
                var identityResult = await _userManager.CreateAsync(appUser, password);
                if (!identityResult.Succeeded)
                {
                    return new ValidationFailedResult("Could not create user.", StatusCodes.Status400BadRequest);
                }

                user = await _userManager.FindByEmailAsync(profile.Mail);
                if (user == null)
                {
                    return new ValidationFailedResult("Failed to create local user account.", StatusCodes.Status400BadRequest);
                }
            }

            var userModel = await GetUserData(user);
            return Ok(userModel);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Post([FromBody] CredentialsViewModel credentials)
        {
            if (!ModelState.IsValid)
            {
                return new ValidationFailedResult(ModelState);
            }

            var user = await Authenticate(credentials.EmailAddress, credentials.Password);
            if (user == null)
            {
                return new ValidationFailedResult("Invalid username or password.", 401);
            }

            var userModel = await GetUserData(user);
            return Ok(userModel);
        }

        [Authorize(Policy = "ApiUser")]
        [HttpPost] // POST api/auth/verify
        [Route("verify")]
        public async Task<IActionResult> Verify()
        {
            if (User.Identity.IsAuthenticated)
            {
                var userIdClaim = User.Claims.Single(c => c.Type == "id");
                var user = _userManager.Users.FirstOrDefault(x => x.Id.ToString() == userIdClaim.Value); //.GetUserAsync(_caller);
                if (user == null)
                    return Forbid();

                var userModel = await GetUserData(user);
                return new ObjectResult(userModel);
            }

            return Forbid();
        }
        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return new ValidationFailedResult(ModelState);
            }

            var user = new PlantLuvIdentityUser
            {
                Name = model.Name,
                UserName = model.EmailAddress,
                Email = model.EmailAddress
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return new ValidationFailedResult(result.Errors.Select(x => x.Description));
            }

            _logger.LogInformation("User created a new account with password.");
            var identity = await Authenticate(model.EmailAddress, model.Password);

            var userModel = await GetUserData(identity);
            return Ok(userModel);
        }

        private async Task<PlantLuvIdentityUser> Authenticate(string emailAddress, string password)
        {
            if (string.IsNullOrEmpty(emailAddress) || string.IsNullOrEmpty(password))
                return await Task.FromResult<PlantLuvIdentityUser>(null);

            // get the user to verifty
            var userToVerify = await _userManager.FindByNameAsync(emailAddress);

            if (userToVerify == null) return await Task.FromResult<PlantLuvIdentityUser>(null);

            // check the credentials
            if (await _userManager.CheckPasswordAsync(userToVerify, password))
            {
                return await Task.FromResult(userToVerify);
            }

            // Credentials are invalid, or account doesn't exist
            return await Task.FromResult<PlantLuvIdentityUser>(null);
        }

        private async Task<UserSummaryViewModel> GetUserData(PlantLuvIdentityUser user)
        {
            if (user == null)
                return null;

            var roles = await _userManager.GetRolesAsync(user);
            if (roles.Count == 0)
            {
                roles.Add("prospect");
            }

            // generate the jwt for the local user...
            var jwt = await _jwtFactory.GenerateEncodedToken(user.UserName,
                _jwtFactory.GenerateClaimsIdentity(user.UserName, user.Id.ToString()));
            var userModel = new UserSummaryViewModel
            {  
                Id = Guid.Parse(user.Id),
                Name = user.Name,
                EmailAddress = user.Email,
                JwtToken = jwt,
                Roles = roles.ToArray(), 
                AccountId = 0 
            };
            return userModel;
        }
    }
}
