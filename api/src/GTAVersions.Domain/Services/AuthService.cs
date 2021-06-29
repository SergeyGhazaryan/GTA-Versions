using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using GTAVersions.Domain.DTO;
using GTAVersions.Domain.Entities;
using GTAVersions.Domain.Interfaces;

namespace GTAVersions.Domain.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserService _userService;

        public AuthService(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<AccessToken> Login(SignInUserDTO request)
        {
            var userDTO = await _userService.GetUserByUsernameAsync(request.Username);

            if (userDTO == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            if (userDTO.Password != request.Password)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }

            var token = await _userService.UpdateAndReturnUserTokenAsync(userDTO);

            if (token == null)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }

            return token;
        }

        public async Task<AccessToken> Signup(SignUpUserDTO request)
        {
            var createdUserId = await _userService.CreateUserAsync(request);

            var createdUser = await _userService.GetUserByIdAsync(createdUserId);

            var token = await _userService.UpdateAndReturnUserTokenAsync(createdUser);

            if (token == null)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }

            return token;
        }
    }
}
