using System.Collections.Generic;
using System.Threading.Tasks;
using GTAVersions.Domain.DTO;

namespace GTAVersions.Domain.Interfaces
{
    public interface IGTAVersionService
    {
        Task<GTAVersionDTO> GetGTAVersion(string id);
        Task<List<GTAVersionDTO>> GetGTAVersions();
        Task<GTAVersionDTO> CreateGTAVersion(CreateGTAVersionDTO createGTAVersionDTO);
        Task<GTAVersionDTO> UpdateGTAVersion(string id, CreateGTAVersionDTO createGTAVersionDTO);
        Task DeleteGTAVersion(string id);
    }
}
