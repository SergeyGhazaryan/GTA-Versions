using System.Threading.Tasks;
using GTAVersions.Data.Entities;
using GTAVersions.Data.Interfaces;

namespace GTAVersions.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IGenericRepository<User> _genericRepository;

        public UserRepository(IGenericRepository<User> genericRepository)
        {
            _genericRepository = genericRepository;
        }

        public async Task<User> GetUserByUsername(string username)
        {
            var query = $"SELECT * FROM Users WHERE username = '{username}'";
            var result = await _genericRepository.GetAsync(query);
            return result;
        }

        public async Task Update(User user)
        {
            var query = $"UPDATE Users SET token = '{user.Token}'";
            await _genericRepository.UpdateAsync(query);
        }

        public async Task<bool> CheckPasswordSignInAsync(string password)
        {
            var query = $"SELECT * FROM Users WHERE password = '{password}'";
            var result = await _genericRepository.GetAsync(query);
            if (result == null) return false;
            return true;
        }

        public async Task DeleteUserToken(string token)
        {
            var query = $"UPDATE Users SET token = '{null}' WHERE token = '{token}'";
            await _genericRepository.UpdateAsync(query);
        }

        public async Task Create(User user)
        {
            var query = $"INSERT INTO Users (username, password) VALUES ('{user.Username}', '{user.Password}');";
            await _genericRepository.CreateAsync(query);
        }
    }
}
