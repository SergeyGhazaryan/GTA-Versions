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
            var query = "SELECT * FROM GTAVersions WHERE Id = @Id";
            var param = new { Id = id };
            var result = await _genericRepository.GetAsync(query, param);
            return result;
        }

        public async Task<IEnumerable<GTAVersion>> GetGTAVersions()
        {
            var query = "SELECT * FROM GTAVersions";
            var result = await _genericRepository.GetAllAsync(query);
            return result;
        }

        public async Task<int> CreateGTAVersion(string image, string name, string information)
        {
            var query = $"INSERT INTO GTAVersions (Image, Name, Information) OUTPUT INSERTED.Id VALUES(@Image, @Name, @Information)";
            var param = new { Image = image, Name = name, Information = information };
            var result = await _genericRepository.CreateAsync(query, param);
            return result;
        }

        public async Task<GTAVersion> UpdateGTAVersion(string id, string image, string name, string information)
        {
            var query = "UPDATE GTAVersions SET Image = @Image, Name = @Name, Information = @Information WHERE Id = @Id";
            var param = new { Id = id, Image = image, Name = name, Information = information };
            var result = await _genericRepository.UpdateAsync(query, param);
            return result;
        }

        public async Task<GTAVersion> DeleteGTAVersion(string id)
        {
            var query = "DELETE FROM GTAVersions WHERE Id = @Id";
            var param = new { Id = id };
            var result = await _genericRepository.DeleteAsync(query, param);
            return result;
        }
    }
}
