using System.Collections.Generic;
using System.Threading.Tasks;
using GTAVersions.Data.Entities;
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

        public async Task CreateGTAVersion(CreateGTAVersionDTO createGTAVersionDTO)
        {
            var gtaVersion = createGTAVersionDTO.Adapt<GTAVersion>();
            await _gtaVersionRepository.CreateGTAVersion(gtaVersion);
        }

        public async Task UpdateGTAVersion(string id, CreateGTAVersionDTO createGTAVersionDTO)
        {
            var gtaVersion = createGTAVersionDTO.Adapt<GTAVersion>();
            await _gtaVersionRepository.UpdateGTAVersion(id, gtaVersion);
        }

        public async Task DeleteGTAVersion(string id)
        {
            await _gtaVersionRepository.DeleteGTAVersion(id);
        }
    }
}
