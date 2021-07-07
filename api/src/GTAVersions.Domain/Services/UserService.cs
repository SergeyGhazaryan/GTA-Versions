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

        public async Task<UserDTO> GetUserByUsername(string username)
        {
            var user = await _userRepository.GetUserByUsername(username);

            return user.Adapt<UserDTO>();
        }

        public async Task<UserDTO> GetUserById(int id)
        {
            var user = await _userRepository.GetUserById(id);

            return user.Adapt<UserDTO>();
        }

        public async Task<AccessToken> GenerateToken(int id, string username)
        {
            var token = await _jwtTokenHandler.GenerateToken(id, username);

            return new AccessToken
            {
                Token = token
            };
        }

        public async Task<UserDTO> CreateUser(string firstName, string lastName, string username, string passwordHash)
        {
            var createdUserId = await _userRepository.CreateUser(firstName, lastName, username, passwordHash);
            var createdUser = await _userRepository.GetUserById(createdUserId);

            return createdUser.Adapt<UserDTO>();
        }

        public async Task<UserDTO> EditUser(int currentUserId, string firstName, string lastName, string username)
        {
            var editedUser = await _userRepository.EditUser(currentUserId, firstName, lastName, username);

            return editedUser.Adapt<UserDTO>();
        }

        public async Task ChangePassword(int id, string passwordHash)
        {
            await _userRepository.ChangePassword(id, passwordHash);
        }
    }
}
