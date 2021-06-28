using System.Threading.Tasks;
using GTAVersions.Data.Entities;

namespace GTAVersions.Data.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetUserByUsername(string username);
        Task Update(User user);
        Task<bool> CheckPasswordSignInAsync(string password);
        Task DeleteUserToken(string token);
    }
}
