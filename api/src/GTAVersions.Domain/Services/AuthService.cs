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
        private readonly IPasswordHasher _passwordHasher;

        public AuthService(IUserService userService, IPasswordHasher passwordHasher)
        {
            _userService = userService;
            _passwordHasher = passwordHasher;
        }

        public async Task<AccessToken> Login(SignInUserDTO request)
        {
            var userDTO = await _userService.GetUserByUsernameAsync(request.Username);

            if (userDTO == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            var verified = _passwordHasher.Check(userDTO.Hash, request.Password);

            if (!verified)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }

            var token = await _userService.UpdateAndReturnUserTokenAsync(userDTO);

            return token;
        }

        public async Task<AccessToken> Signup(SignUpUserDTO request)
        {
            var hashedPassword = _passwordHasher.Hash(request.Password);

            var createdUserId = await _userService.CreateUserAsync(request.Username, hashedPassword);

            if(createdUserId == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
 
            var createdUser = await _userService.GetUserByIdAsync(createdUserId);

            var token = await _userService.UpdateAndReturnUserTokenAsync(createdUser);

            return token;
        }
    }
}
