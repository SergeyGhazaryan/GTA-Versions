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

        public async Task<AccessToken> UpdateAndReturnUserToken(UserDTO userDTO)
        {
            var token = await _jwtTokenHandler.GenerateToken(userDTO.Adapt<User>());

            return new AccessToken
            {
                Token = token
            };
        }

        public async Task<int> CreateUser(string firstName, string lastName, string username, string passwordHash)
        {
            var userid = await _userRepository.CreateUser(firstName, lastName, username, passwordHash);

            return userid;
        }

        public async Task<UserDTO> EditUser(EditUserDTO editUserDTO, string currentUserId)
        {
            var id = int.Parse(currentUserId);
            var editedUser = await _userRepository.EditUser(editUserDTO.FirstName, editUserDTO.LastName, editUserDTO.Username, id);

            return editedUser.Adapt<UserDTO>();
        }

        public async Task<UserDTO> ChangePassword(int id, string passwordHash)
        {
            var changedPassword = await _userRepository.ChangePassword(id, passwordHash);

            return changedPassword.Adapt<UserDTO>();
        }

        public async Task<UserDTO> GetCurrentUser(string currentUserid)
        {
            var id = int.Parse(currentUserid);
            var currentUser = await _userRepository.GetCurrentUser(id);

            return currentUser.Adapt<UserDTO>();
        }
    }
}
