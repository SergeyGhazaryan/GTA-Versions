using System.Collections.Generic;
using System.Threading.Tasks;
using GTAVersions.Data.Entities;
using GTAVersions.Data.Interfaces;

namespace GTAVersions.Data.Repositories
{
    public class GTAVersionRepository : IGTAVersionRepository
    {
        private readonly IGenericRepository<GTAVersion> _genericRepository;

        public GTAVersionRepository(IGenericRepository<GTAVersion> genericRepository)
        {
            _genericRepository = genericRepository;
        }

        public async Task<GTAVersion> GetGTAVersion(string id)
        {
            var query = $"SELECT * FROM GTAVersions WHERE id = '{id}'";
            var result = await _genericRepository.GetAsync(query);
            return result;
        }

        public async Task<IEnumerable<GTAVersion>> GetGTAVersions()
        {
            var query = "SELECT * FROM GTAVersions";
            var result = await _genericRepository.GetAllAsync(query);
            return result;
        }

        public async Task CreateGTAVersion(GTAVersion gtaVersion)
        {
            var query = $"INSERT INTO GTAVersions (Image, VersionName, Information) " +
                        $"OUTPUT INSERTED.Id " +
                        $"VALUES('{gtaVersion.Image}', '{gtaVersion.VersionName}', '{gtaVersion.Information}')";
            await _genericRepository.CreateAsync(query, gtaVersion);
        }

        public async Task UpdateGTAVersion(string id, GTAVersion gtaVersion)
        {
            var query = $"UPDATE GTAVersions SET image = '{gtaVersion.Image}', versionName = '{gtaVersion.VersionName}', information = '{gtaVersion.Information}' WHERE id = '{id}'";
            await _genericRepository.UpdateAsync(query);
        }

        public async Task DeleteGTAVersion(string id)
        {
            var query = $"DELETE FROM GTAVersions WHERE Id = '{id}'";
            await _genericRepository.DeleteAsync(query);
        }
    }
}
