using System.Threading.Tasks;
using GTAVersions.Domain.DTO;
using GTAVersions.Domain.Entities;

namespace GTAVersions.Domain.Interfaces
{
    public interface IUserService
    {
        Task<UserDTO> GetUserByUsername(string username);
        Task<UserDTO> GetUserById(int id);
        Task<AccessToken> UpdateAndReturnUserToken(UserDTO userDTO);
        Task<int> CreateUser(string name, string surname, string username, string passwordHash);
        Task<UserDTO> EditUser(EditUserDTO editUserDTO, string currentUserId);
        Task<UserDTO> ChangePassword(int id, string passwordHash);
        Task<UserDTO> GetCurrentUser(string currentUserid);
    }
}
