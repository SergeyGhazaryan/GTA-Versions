using System.Threading.Tasks;
using GTAVersions.Domain.DTO;
using GTAVersions.Domain.Entities;

namespace GTAVersions.Domain.Interfaces
{
    public interface IAuthService
    {
        Task<AccessToken> Login(SignInUserDTO request);
        Task<AccessToken> Signup(SignUpUserDTO request);
        Task<UserDTO> ChangePassword(ChangePasswordDTO request, string currentUserId);
    }
}
