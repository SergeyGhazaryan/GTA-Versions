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
            var userDTO = await _userService.GetUserByUsername(request.Username);

            if (userDTO == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            var verified = _passwordHasher.Check(userDTO.PasswordHash, request.Password);

            if (!verified)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }

            var token = await _userService.UpdateAndReturnUserToken(userDTO);

            return token;
        }

        public async Task<AccessToken> Signup(SignUpUserDTO request)
        {
            var passwordHash = _passwordHasher.PasswordHash(request.Password);
            var createdUserId = await _userService.CreateUser(request.FirstName, request.LastName, request.Username, passwordHash);

            if (createdUserId == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            var createdUser = await _userService.GetUserById(createdUserId);
            var token = await _userService.UpdateAndReturnUserToken(createdUser);

            return token;
        }

        public async Task<UserDTO> ChangePassword(ChangePasswordDTO request, string currentUserId)
        {
            var id = int.Parse(currentUserId);
            var currentUser = await _userService.GetUserById(id);

            var verified = _passwordHasher.Check(currentUser.PasswordHash, request.OldPassword);

            if (!verified)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }

            var passwordHash = _passwordHasher.PasswordHash(request.NewPassword);
            var changedPassword = await _userService.ChangePassword(id, passwordHash);

            return changedPassword;
        }
    }
}
