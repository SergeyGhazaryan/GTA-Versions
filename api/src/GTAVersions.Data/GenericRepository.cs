using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using GTAVersions.Data.Interfaces;

namespace GTAVersions.Data
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly IDbConnection _connection;

        public GenericRepository(IDbConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<T>> GetAllAsync(string query, object param = null)
        {
            var result = await _connection.QueryAsync<T>(query, param);
            return result;
        }

        public async Task<T> GetAsync(string query, object param = null)
        {
            var result = await _connection.QueryFirstOrDefaultAsync<T>(query, param);
            return result;
        }

        public async Task<int> CreateAsync(string query, object param = null)
        {
            var result = await _connection.ExecuteScalarAsync<int>(query, param);
            return result;
        }

        public async Task<T> UpdateAsync(string query, object param = null)
        {
            var result = await _connection.ExecuteScalarAsync<T>(query, param);
            return result;
        }

        public async Task<T> DeleteAsync(string query, object param = null)
        {
            var result = await _connection.ExecuteScalarAsync<T>(query, param);
            return result;
        }
    }
}
