using System.Threading.Tasks;
using GTAVersions.Data.Entities;
using GTAVersions.Domain.DTO;

namespace GTAVersions.Domain.Interfaces
{
    public interface IAuthService
    {
        Task<AccessToken> Login(SignInUserDTO request);
        Task Logout(SignOutUserDTO request);
    }
}
