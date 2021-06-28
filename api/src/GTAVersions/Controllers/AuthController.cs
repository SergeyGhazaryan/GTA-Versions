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
            var token = await _authService.Login(model);

            return Ok(token);
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] SignOutUserDTO model)
        {
            await _authService.Logout(model);

            return Ok();
        }
    }
}
