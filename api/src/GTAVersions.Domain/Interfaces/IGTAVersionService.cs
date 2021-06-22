using System.Collections.Generic;
using System.Threading.Tasks;
using GTAVersions.Domain.DTO;
using Microsoft.VisualBasic;

namespace GTAVersions.Domain.Interfaces
{
    public interface IGTAVersionService
    {
        Task<GTAVersionDTO> GetGTAVersion(string id);
        Task<List<GTAVersionDTO>> GetGTAVersions();
        Task<int> CreateGTAVersion(CreateGTAVersionDTO createGTAVersionDTO);
        Task<GTAVersionDTO> UpdateGTAVersion(string id, CreateGTAVersionDTO createGTAVersionDTO);
        Task<GTAVersionDTO> DeleteGTAVersion(string id);
    }
}
