using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace PlantLuv.Web.Auth
{
    public class Tokens
    {
        public static async Task<string> GenerateJwt(ClaimsIdentity identity,
            IJwtFactory jwtFactory, string userName, JwtIssuerOptions jwtOptions,
            JsonSerializerSettings serializerSettings)
        {
            var response = new
            {
                id = identity.Claims.Single(c => c.Type == "id").Value,
                auth_token = await GenerateJwtToken(identity, jwtFactory, userName, jwtOptions, serializerSettings),
                expires_in = (int)jwtOptions.ValidFor.TotalSeconds
            };

            return JsonConvert.SerializeObject(response, serializerSettings);
        }
        public static async Task<string> GenerateJwtToken(ClaimsIdentity identity,
            IJwtFactory jwtFactory, string userName, JwtIssuerOptions jwtOptions,
            JsonSerializerSettings serializerSettings)
        {
            return await jwtFactory.GenerateEncodedToken(userName, identity);
        }
    }
}
