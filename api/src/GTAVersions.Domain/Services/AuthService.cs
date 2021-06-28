using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using GTAVersions.Data.Entities;
using GTAVersions.Domain.DTO;
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
            var userDTO = await _userService.FindByUsernameAsync(request.Username);

            if (userDTO == null)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }

            bool signInResult = false;

            if (userDTO.Password == request.Password) signInResult = true;

            if (!signInResult)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }

            var token = await _userService.UpdateAndReturnUserToken(userDTO);

            return token;
        }

        public async Task Logout(SignOutUserDTO request)
        {
            await _userService.DeleteUserToken(request);
        }
    }
}
