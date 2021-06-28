using System.Threading.Tasks;
using GTAVersions.Domain.DTO;
using GTAVersions.Domain.Entities;

namespace GTAVersions.Domain.Interfaces
{
    public interface IUserService
    {
        Task<UserDTO> FindByUsernameAsync(string username);
        Task<bool> CheckPasswordSignInAsync(string password);
        Task<AccessToken> UpdateAndReturnUserToken(UserDTO userDTO);
        Task DeleteUserToken(SignOutUserDTO request);
        Task<UserDTO> CreateUser(SignInUserDTO signInUserDTO);
    }
}
