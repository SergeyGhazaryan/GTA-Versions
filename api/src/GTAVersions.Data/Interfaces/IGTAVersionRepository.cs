using System.Collections.Generic;
using System.Threading.Tasks;
using GTAVersions.Data.Entities;

namespace GTAVersions.Data.Interfaces
{
    public interface IGTAVersionRepository
    {
        Task<GTAVersion> GetGTAVersion(string Id);
        Task<IEnumerable<GTAVersion>> GetGTAVersions();
        Task CreateGTAVersion(GTAVersion gtaVersion);
        Task UpdateGTAVersion(string id, GTAVersion gtaVersion);
        Task DeleteGTAVersion(string id);
    }
}
