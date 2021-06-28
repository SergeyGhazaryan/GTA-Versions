using System.Threading.Tasks;
using GTAVersions.Data.Entities;
using GTAVersions.Data.Interfaces;
using GTAVersions.Domain.DTO;
using GTAVersions.Domain.Interfaces;
using GTAVersions.Domain.JWT;
using Mapster;

namespace GTAVersions.Domain.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly JWTTokenHandler _jwtTokenHandler;

        public UserService(IUserRepository userRepository, JWTTokenHandler jwtTokenHandler)
        {
            _userRepository = userRepository;
            _jwtTokenHandler = jwtTokenHandler;
        }

        public async Task<UserDTO> FindByUsernameAsync(string username)
        {
            var user = await _userRepository.GetUserByUsername(username);
            return user.Adapt<UserDTO>();
        }

        public async Task<bool> CheckPasswordSignInAsync(string password)
        {
            var result = await _userRepository.CheckPasswordSignInAsync(password);
            return result;
        }

        public async Task<AccessToken> UpdateAndReturnUserToken(UserDTO userDTO)
        {
            var token = await _jwtTokenHandler.GenerateToken(userDTO.Adapt<User>());
            userDTO.Token = token;
            await _userRepository.Update(userDTO.Adapt<User>());

            return new AccessToken
            {
                Token = token
            };
        }

        public async Task DeleteUserToken(SignOutUserDTO request)
        {
            await _userRepository.DeleteUserToken(request.Token);
        }

        public async Task CreateUser(SignInUserDTO signInUserDTO)
        {
            await _userRepository.Create(signInUserDTO.Adapt<User>());
        }
    }
}
