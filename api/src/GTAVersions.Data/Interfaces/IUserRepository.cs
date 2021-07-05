using System.Threading.Tasks;
using GTAVersions.Data.Entities;

namespace GTAVersions.Data.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetUserByUsername(string username);
        Task<User> GetUserById(int id);
        Task<int> CreateUser(string firstName, string lastName, string username, string passwordHash);
        Task<User> EditUser(int id, string firstName, string lastName, string username);
        Task<User> ChangePassword(int id, string passwordHash);
        Task<User> GetCurrentUser(int id);
    }
}
