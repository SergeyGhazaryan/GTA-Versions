using System.Collections.Generic;
using System.Threading.Tasks;
using GTAVersions.Data.Interfaces;
using GTAVersions.Domain.DTO;
using GTAVersions.Domain.Interfaces;
using Mapster;

namespace GTAVersions.Domain.Services
{
    public class GTAVersionService : IGTAVersionService
    {
        private readonly IGTAVersionRepository _gtaVersionRepository;

        public GTAVersionService(IGTAVersionRepository gtaVersionRepository)
        {
            _gtaVersionRepository = gtaVersionRepository;
        }

        public async Task<GTAVersionDTO> GetGTAVersion(string id)
        {
            var gtaVersion = await _gtaVersionRepository.GetGTAVersion(id);
            return gtaVersion.Adapt<GTAVersionDTO>();
        }

        public async Task<List<GTAVersionDTO>> GetGTAVersions()
        {
            var gtaVersions = await _gtaVersionRepository.GetGTAVersions();
            return gtaVersions.Adapt<List<GTAVersionDTO>>();
        }

        public async Task<int> CreateGTAVersion(string image, string name, string information)
        {
            var gtaVersionId = await _gtaVersionRepository.CreateGTAVersion(image, name, information);
            return gtaVersionId;
        }

        public async Task<GTAVersionDTO> UpdateGTAVersion(string id, string image, string name, string information)
        {
            var gtaVersion = await _gtaVersionRepository.UpdateGTAVersion(id, image, name, information);
            return gtaVersion.Adapt<GTAVersionDTO>();
        }

        public async Task<GTAVersionDTO> DeleteGTAVersion(string id)
        {
            var gtaVersion = await _gtaVersionRepository.DeleteGTAVersion(id);
            return gtaVersion.Adapt<GTAVersionDTO>();
        }
    }
}
