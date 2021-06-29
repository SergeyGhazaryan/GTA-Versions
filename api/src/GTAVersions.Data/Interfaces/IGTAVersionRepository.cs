using System.Collections.Generic;
using System.Threading.Tasks;
using GTAVersions.Data.Entities;

namespace GTAVersions.Data.Interfaces
{
    public interface IGTAVersionRepository
    {
        Task<GTAVersion> GetGTAVersion(string Id);
        Task<IEnumerable<GTAVersion>> GetGTAVersions();
        Task<GTAVersion> CreateGTAVersion(GTAVersion gtaVersion);
        Task<GTAVersion> UpdateGTAVersion(string id, GTAVersion gtaVersion);
        Task<GTAVersion> DeleteGTAVersion(string id);
    }
}
