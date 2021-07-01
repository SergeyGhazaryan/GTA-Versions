using System.Threading.Tasks;
using GTAVersions.Data.Entities;
using GTAVersions.Data.Interfaces;
using GTAVersions.Domain.DTO;
using GTAVersions.Domain.Entities;
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

        public async Task<UserDTO> GetUserByUsernameAsync(string username)
        {
            var user = await _userRepository.GetUserByUsername(username);

            return user.Adapt<UserDTO>();
        }

        public async Task<UserDTO> GetUserByIdAsync(int id)
        {
            var user = await _userRepository.GetUserById(id);

            return user.Adapt<UserDTO>();
        }

        public async Task<AccessToken> UpdateAndReturnUserTokenAsync(UserDTO userDTO)
        {
            var token = await _jwtTokenHandler.GenerateToken(userDTO.Adapt<User>());

            return new AccessToken
            {
                Token = token
            };
        }

        public async Task<int> CreateUserAsync(string username, string passwordHash)
        {
            var userid = await _userRepository.Create(username, passwordHash);

            return userid;
        }
    }
}
