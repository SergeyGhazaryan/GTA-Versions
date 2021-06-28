using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using GTAVersions.Data;
using GTAVersions.Data.Entities;
using GTAVersions.Data.Interfaces;
using GTAVersions.Data.Repositories;
using GTAVersions.Domain.Interfaces;
using GTAVersions.Domain.JWT;
using GTAVersions.Domain.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace GTAVersions
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));

            services.AddControllers();
            services.Configure<JWTOption>(Configuration.GetSection("Jwt"));
            string dbConnectionString = this.Configuration.GetConnectionString("DefaultConnection");

            services.AddTransient<IDbConnection>((sp) => new SqlConnection(dbConnectionString));
            services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddTransient<IAuthService, AuthService>();
            services.AddTransient<IGTAVersionRepository, GTAVersionRepository>();
            services.AddTransient<IGTAVersionService, GTAVersionService>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<JWTTokenHandler>();

            using var provider = services.BuildServiceProvider();
            var jwtTokenHandler = provider.GetService<JWTTokenHandler>();

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = jwtTokenHandler.GetValidationParameters();
            });

            services.AddAuthorization();

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("MyPolicy");

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
