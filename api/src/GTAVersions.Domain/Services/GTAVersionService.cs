﻿using System.Collections.Generic;
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

        public async Task<int> CreateGTAVersion(CreateGTAVersionDTO createGTAVersionDTO)
        {
            var gtaVersion = createGTAVersionDTO.Adapt<GTAVersion>();
            var createdGTAVersionId = await _gtaVersionRepository.CreateGTAVersion(gtaVersion);
            return createdGTAVersionId;
        }

        public async Task<GTAVersionDTO> UpdateGTAVersion(string id, CreateGTAVersionDTO createGTAVersionDTO)
        {
            var gtaVersion = createGTAVersionDTO.Adapt<GTAVersion>();
            var updatedGTAVersion = await _gtaVersionRepository.UpdateGTAVersion(id, gtaVersion);
            return updatedGTAVersion.Adapt<GTAVersionDTO>();
        }

        public async Task<GTAVersionDTO> DeleteGTAVersion(string id)
        {
            var deletedGTSVersion = await _gtaVersionRepository.DeleteGTAVersion(id);
            return deletedGTSVersion.Adapt<GTAVersionDTO>();
        }
    }
}