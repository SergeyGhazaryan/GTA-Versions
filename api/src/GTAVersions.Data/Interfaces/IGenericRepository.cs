using System.Collections.Generic;
using System.Threading.Tasks;

namespace GTAVersions.Data.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T> GetAsync(string query, object param = null);
        Task<IEnumerable<T>> GetAllAsync(string query, object param = null);
        Task<int> CreateAsync(string query, object param = null);
        Task<T> UpdateAsync(string query, object param = null);
        Task<T> DeleteAsync(string query, object param = null);
    }
}
