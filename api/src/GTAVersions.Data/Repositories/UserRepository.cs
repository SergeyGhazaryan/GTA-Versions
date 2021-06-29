﻿using System.Threading.Tasks;
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

        public async Task<bool> CheckPasswordSignIn(string password)
        {
            var query = "SELECT * FROM Users WHERE Password = @Password";
            var param = new { Password = password };
            var result = await _genericRepository.GetAsync(query, param);
            if (result == null) return false;
            return true;
        }

        public async Task<int> Create(User user)
        {
            var query = "INSERT INTO Users (Username, Password) OUTPUT INSERTED.Id VALUES (@Username, @Password)";
            var param = new { Username = user.Username, Password = user.Password };
            var result = await _genericRepository.CreateAsync(query, param);
            return result;
        }
    }
}
