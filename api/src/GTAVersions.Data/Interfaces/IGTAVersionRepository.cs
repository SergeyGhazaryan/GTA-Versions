using System.Collections.Generic;
using System.Threading.Tasks;
using GTAVersions.Data.Entities;

namespace GTAVersions.Data.Interfaces
{
    public interface IGTAVersionRepository
    {
        Task<GTAVersion> GetGTAVersion(string Id);
        Task<IEnumerable<GTAVersion>> GetGTAVersions();
        Task<int> CreateGTAVersion(string image, string name, string information);
        Task<GTAVersion> UpdateGTAVersion(string id, string image, string name, string information);
        Task<GTAVersion> DeleteGTAVersion(string id);
    }
}
