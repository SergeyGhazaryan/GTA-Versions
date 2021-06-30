using System.Threading.Tasks;
using GTAVersions.Data.Entities;

namespace GTAVersions.Data.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetUserByUsername(string username);
        Task<User> GetUserById(int id);
        Task<int> Create(string username, string hash);
    }
}
