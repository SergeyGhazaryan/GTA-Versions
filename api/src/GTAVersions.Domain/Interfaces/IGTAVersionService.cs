using System.Collections.Generic;
using System.Threading.Tasks;
using GTAVersions.Domain.DTO;

namespace GTAVersions.Domain.Interfaces
{
    public interface IGTAVersionService
    {
        Task<GTAVersionDTO> GetGTAVersion(string id);
        Task<List<GTAVersionDTO>> GetGTAVersions();
        Task<int> CreateGTAVersion(string image, string name, string information);
        Task<GTAVersionDTO> UpdateGTAVersion(string id, string image, string name, string information);
        Task<GTAVersionDTO> DeleteGTAVersion(string id);
    }
}
