using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using GTAVersions.Data.Entities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace GTAVersions.Domain.JWT
{
    public class JWTTokenHandler
    {
        private readonly JWTOption _jwtOptions;

        public JWTTokenHandler(IOptions<JWTOption> jwtOptions)
        {
            _jwtOptions = jwtOptions.Value;
        }

        public Task<string> GenerateToken(int id, string username)
        {
            string issuer = _jwtOptions.Issuer;
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, id.ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim(JwtRegisteredClaimNames.Iss, issuer),
                new Claim(JwtRegisteredClaimNames.NameId, username),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.UtcNow.AddSeconds(3000);

            var token = new JwtSecurityToken(
                issuer,
                issuer,
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return Task.FromResult(new JwtSecurityTokenHandler().WriteToken(token));
        }

        public TokenValidationParameters GetValidationParameters()
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Key));
            string issuer = _jwtOptions.Issuer;
            bool validateIssuer = _jwtOptions.ValidateIssuer;

            return new TokenValidationParameters
            {
                IssuerSigningKey = key,
                ClockSkew = TimeSpan.Zero,
                ValidateLifetime = true,
                ValidIssuer = issuer,
                ValidAudience = issuer,
                ValidateIssuerSigningKey = _jwtOptions.ValidateIssuerSigningKey,
                ValidateIssuer = validateIssuer,
                ValidateAudience = validateIssuer,
            };
        }
    }
}
