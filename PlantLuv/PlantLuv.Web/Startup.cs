using System;
using System.IO.Compression;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using PlantLuv.Web.Filters;
using PlantLuv.Web.Auth;
using PlantLuv.SqlDbServices;
using Microsoft.AspNetCore.Hosting;
using PlantLuv.Files;

namespace PlantLuv.Web
{
    public class Startup
	{
		private const string SecretKey = "9879859859457125736875982357841"; //TODO: make up a secure key and get from somewhere secure
		private readonly SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));

		private IConfiguration Configuration { get; }
		private IHostEnvironment Environment;

		public Startup(IConfiguration configuration, IHostEnvironment env)
		{
			Configuration = configuration;
			Environment = env;
		}

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddRouting(options => options.LowercaseUrls = true);
            services.AddCors();
            services.AddMvc(o =>
            {
                o.Filters.Add(typeof(GlobalExceptionFilter));
            })
                .ConfigureApiBehaviorOptions(options =>
                {
                    options.InvalidModelStateResponseFactory = context =>
                    {
                        return new ValidationFailedResult(context.ModelState);
                    };
                })
                .AddNewtonsoftJson(options =>
                {
                    var settings = options.SerializerSettings;
                    settings.ContractResolver = new DefaultContractResolver()
                    {
                        NamingStrategy = new CamelCaseNamingStrategy
                        {
                            ProcessDictionaryKeys = false,
                            OverrideSpecifiedNames = true
                        }
                    };
                    settings.Converters = new JsonConverter[]
                    {
                        new IsoDateTimeConverter(),
                        new StringEnumConverter(new CamelCaseNamingStrategy())
                    };
                });

            services.Configure<GzipCompressionProviderOptions>(options => options.Level = CompressionLevel.Fastest);
            services.AddResponseCompression(options => { options.Providers.Add<GzipCompressionProvider>(); });

            services.AddSpaStaticFiles(config =>
            {
                config.RootPath = Configuration["SpaRoot"];
            });

            services.Configure<MicrosoftAuthSettings>(Configuration.GetSection(nameof(MicrosoftAuthSettings)));

            if (!Environment.IsDevelopment())
                services.Configure<MvcOptions>(o => o.Filters.Add(new RequireHttpsAttribute()));

            var jwtOptions = Configuration.GetSection(nameof(JwtIssuerOptions));
            services.Configure<JwtIssuerOptions>(options =>
            {
                options.Issuer = jwtOptions[nameof(JwtIssuerOptions.Issuer)];
                options.Audience = jwtOptions[nameof(JwtIssuerOptions.Audience)];
                options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256);
            });
            var tokenValidationPrms = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = jwtOptions[nameof(JwtIssuerOptions.Issuer)],
                ValidateAudience = true,
                ValidAudience = jwtOptions[nameof(JwtIssuerOptions.Audience)],
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _signingKey,
                RequireExpirationTime = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(configureOptions =>
            {
                configureOptions.ClaimsIssuer = jwtOptions[nameof(JwtIssuerOptions.Issuer)];
                configureOptions.TokenValidationParameters = tokenValidationPrms;
                configureOptions.SaveToken = true;
            });
            services.AddAuthorization(options =>
            {
                options.AddPolicy("ApiUser", policy => policy.RequireClaim(Constants.JwtClaimIdentifiers.Rol, Constants.JwtClaims.ApiAccess));
            });

            services.AddDbContext<PlantLuvDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            var dbAssemblyName = typeof(PlantLuvIdentityDbContext).Namespace;
            services.AddDbContext<PlantLuvIdentityDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection"),
                    sqlOptions => sqlOptions.MigrationsAssembly(dbAssemblyName)
                ));

            var identityBuilder = services.AddIdentityCore<PlantLuvIdentityUser>(o =>
            { //TODO: override any password rules here on the options 'o'
            }); //best explanation of identity setup: https://github.com/aspnet/Identity/issues/1376
            identityBuilder = new IdentityBuilder(identityBuilder.UserType, typeof(IdentityRole), identityBuilder.Services);
            identityBuilder.AddEntityFrameworkStores<PlantLuvIdentityDbContext>();
            identityBuilder.AddRoleValidator<RoleValidator<IdentityRole>>();
            identityBuilder.AddRoleManager<RoleManager<IdentityRole>>();
            identityBuilder.AddSignInManager<SignInManager<PlantLuvIdentityUser>>();
            identityBuilder.AddDefaultTokenProviders();

            AddAppServices(services);
        }

        private static void AddAppServices(IServiceCollection services)
        {
            //add custom app interface implementation classes here...
            services.AddSingleton<IJwtFactory, JwtFactory>();
            services.AddScoped<IFileData, SqlFileData>();
            services.AddScoped<IImageResizer, SixLaborsImageResizer>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(
			IApplicationBuilder app, 
			IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseCors(builder =>
			{
				var origins = Configuration["CorsOrigins"] ?? "";
				builder.WithOrigins(origins.Split("||", StringSplitOptions.RemoveEmptyEntries))
					.AllowAnyMethod()
					.AllowCredentials()
					.AllowAnyHeader();
			});

			app.UseHttpsRedirection();
			app.UseResponseCompression();
			app.UseStaticFiles();
			app.UseSpaStaticFiles();

			app.UseRouting();
			app.UseAuthentication();
			app.UseAuthorization();

			app.UseEndpoints(routes =>
			{
				routes.MapControllers();
			});

			app.UseWhen(
				context => !context.Request.Path.StartsWithSegments("/api"),
				appBuilder => appBuilder.UseSpa(spa =>
				{
					if (env.IsDevelopment())
					{
						spa.Options.SourcePath = "../PlantLuv-ng";
						spa.Options.StartupTimeout = new TimeSpan(0, 0, 300); //300 seconds
						spa.UseAngularCliServer(npmScript: "start");
					}
				}));
		
		}
	}
}
