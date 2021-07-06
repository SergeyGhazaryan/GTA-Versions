using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using GTAVersions.Domain.DTO;
using GTAVersions.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GTAVersions.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] SignInUserDTO model)
        {
            var token = await _authService.Login(model.FirstName, model.LastName, model.Username, model.Password);

            return Ok(token);
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignUpUserDTO model)
        {
            var token = await _authService.Signup(model.FirstName, model.LastName, model.Username, model.Password);

            return Ok(token);
        }

        [Authorize]
        [HttpPatch("settings")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDTO model)
        {
            var currentUserId = int.Parse(HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub));
            var changedPassword = await _authService.ChangePassword(model.NewPassword, model.OldPassword, currentUserId);

            return Ok(changedPassword);
        }
    }
}
