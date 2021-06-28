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

        public Task<string> GenerateToken(User user)
        {

            string issuer = "https://localhost:5001";
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim(JwtRegisteredClaimNames.Iss, issuer),
                new Claim(JwtRegisteredClaimNames.NameId, user.Username),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("6c547e89-fdbc-4d0b-8c48-5a69ba2decab"));
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

        public ClaimsPrincipal GetClaimsPrincipal(string accessToken)
        {
            var tokenTypeIndex = accessToken.IndexOf(' ');
            if (tokenTypeIndex != -1)
            {
                accessToken = accessToken.Substring(tokenTypeIndex + 1, accessToken.Length - tokenTypeIndex - 1);
            }

            var tokenValidationParameters = GetValidationParameters();
            tokenValidationParameters.ValidateLifetime = false;

            var tokenHandler = new JwtSecurityTokenHandler();
            ClaimsPrincipal principal = tokenHandler.ValidateToken(accessToken, tokenValidationParameters, out var securityToken);

            if (!(securityToken is JwtSecurityToken jwtSecurityToken) ||
                !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                return null;
            }

            return principal;
        }

        public bool IsTokenValid(string accessToken)
        {
            return GetClaimsPrincipal(accessToken) != null;
        }

        public TokenValidationParameters GetValidationParameters()
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("6c547e89-fdbc-4d0b-8c48-5a69ba2decab"));
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
