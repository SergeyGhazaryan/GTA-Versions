using System.Threading.Tasks;
using GTAVersions.Domain.DTO;
using GTAVersions.Domain.Entities;

namespace GTAVersions.Domain.Interfaces
{
    public interface IAuthService
    {
        Task<AccessToken> Login(string firstName, string lastName, string username, string password);
        Task<AccessToken> Signup(string firstName, string lastName, string username, string password);
        Task<UserDTO> ChangePassword(string newPassword, string oldPassword, int currentUserId);
    }
}
