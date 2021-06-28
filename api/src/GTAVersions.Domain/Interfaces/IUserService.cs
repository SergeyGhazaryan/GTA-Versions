using System.Threading.Tasks;
using GTAVersions.Data.Entities;
using GTAVersions.Domain.DTO;

namespace GTAVersions.Domain.Interfaces
{
    public interface IUserService
    {
        Task<UserDTO> FindByUsernameAsync(string username);
        Task<bool> CheckPasswordSignInAsync(string password);
        Task<AccessToken> UpdateAndReturnUserToken(UserDTO userDTO);
        Task DeleteUserToken(SignOutUserDTO request);
        Task CreateUser(SignInUserDTO signInUserDTO);
    }
}
