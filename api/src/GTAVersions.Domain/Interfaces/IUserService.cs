using System.Threading.Tasks;
using GTAVersions.Domain.DTO;
using GTAVersions.Domain.Entities;

namespace GTAVersions.Domain.Interfaces
{
    public interface IUserService
    {
        Task<UserDTO> GetUserByUsernameAsync(string username);
        Task<UserDTO> GetUserByIdAsync(int id);
        Task<AccessToken> UpdateAndReturnUserTokenAsync(UserDTO userDTO);
        Task<int> CreateUserAsync(string username, string hash);
    }
}
