using System.Collections.Generic;
using System.Threading.Tasks;

namespace GTAVersions.Data.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T> GetAsync(string query, object param = null);
        Task<IEnumerable<T>> GetAllAsync(string query, object param = null);
        Task CreateAsync(string query, T model = null);
        Task UpdateAsync(string query, T model = null);
        Task DeleteAsync(string query, object param = null);
    }
}
