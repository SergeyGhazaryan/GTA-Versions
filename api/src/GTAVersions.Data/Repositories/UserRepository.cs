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
            var query = "SELECT * FROM Users WHERE Username = @Username";
            var param = new { Username = username };
            var result = await _genericRepository.GetAsync(query, param);
            return result;
        }

        public async Task<User> GetUserById(int id)
        {
            var query = "SELECT * FROM Users WHERE Id = @Id";
            var param = new { Id = id };
            var result = await _genericRepository.GetAsync(query, param);
            return result;
        }

        public async Task<int> CreateUser(string firstName, string lastName, string username, string passwordHash)
        {
            var query = "INSERT INTO Users (FirstName, LastName, Username, PasswordHash) OUTPUT INSERTED.Id VALUES (@FirstName, @LastName, @Username, @PasswordHash)";
            var param = new { FirstName = firstName, LastName = lastName, Username = username, PasswordHash = passwordHash };
            var result = await _genericRepository.CreateAsync(query, param);
            return result;
        }

        public async Task<User> EditUser(int id, string firstName, string lastName, string username)
        {
            var query = "UPDATE Users SET FirstName = @FirstName, LastName = @LastName, Username = @Username WHERE Id = @Id";
            var param = new { Id = id, FirstName = firstName, LastName = lastName, Username = username };
            var result = await _genericRepository.UpdateAsync(query, param);
            return result;
        }

        public async Task ChangePassword(int id, string passwordHash)
        {
            var query = "UPDATE Users SET PasswordHash = @PasswordHash WHERE Id = @Id";
            var param = new { Id = id, PasswordHash = passwordHash };
            await _genericRepository.UpdateAsync(query, param);
        }
    }
}
