using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using GTAVersions.Domain.DTO;
using GTAVersions.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GTAVersions.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPut("me/settings")]
        public async Task<IActionResult> EditUser([FromBody] EditUserDTO editUserDTO)
        {
            var currentUserId = HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub);

            var editedUser = await _userService.EditUser(editUserDTO, currentUserId);

            return Ok(editedUser);
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var currentUserId = HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sub);

            var currentUser = await _userService.GetCurrentUser(currentUserId);

            return Ok(currentUser);
        }
    }
}
