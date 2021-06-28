using System.Threading.Tasks;
using GTAVersions.Domain.DTO;
using GTAVersions.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GTAVersions.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GTAVersionsController : ControllerBase
    {
        private readonly IGTAVersionService _gtaVersionService;

        public GTAVersionsController(IGTAVersionService gtaVersionService)
        {
            _gtaVersionService = gtaVersionService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGTAVersion([FromRoute] string id)
        {
            var gtaVersion = await _gtaVersionService.GetGTAVersion(id);

            return Ok(gtaVersion);
        }

        [HttpGet]
        public async Task<IActionResult> GetGTAVersions()
        {
            var gtaVersions = await _gtaVersionService.GetGTAVersions();

            return Ok(gtaVersions);
        }

        [HttpPost]
        public async Task<IActionResult> CreateGTAVersion([FromBody] CreateGTAVersionDTO createGTAVersionDTO)
        {
            var createdGTAVersion = await _gtaVersionService.CreateGTAVersion(createGTAVersionDTO);

            return Ok(createdGTAVersion);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGTAVersion([FromRoute] string id, CreateGTAVersionDTO createGTAVersionDTO)
        {
            var updatedGTAVersion = await _gtaVersionService.UpdateGTAVersion(id, createGTAVersionDTO);

            return Ok(updatedGTAVersion);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGTAVersion([FromRoute] string id)
        {
            await _gtaVersionService.DeleteGTAVersion(id);

            return Ok();
        }
    }
}
