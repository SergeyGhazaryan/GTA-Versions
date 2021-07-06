using System.Threading.Tasks;
using GTAVersions.Domain.DTO;
using GTAVersions.Domain.Entities;

namespace GTAVersions.Domain.Interfaces
{
    public interface IUserService
    {
        Task<UserDTO> GetUserByUsername(string username);
        Task<UserDTO> GetUserById(int id);
        Task<AccessToken> UpdateUserToken(int id, string username);
        Task<UserDTO> CreateUser(string firstName, string lastName, string username, string passwordHash);
        Task<UserDTO> EditUser(int currentUserId, string firstName, string lastName, string username);
        Task<UserDTO> ChangePassword(int id, string passwordHash);
    }
}
