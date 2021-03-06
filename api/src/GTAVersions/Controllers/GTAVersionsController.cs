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
        public async Task<IActionResult> CreateGTAVersion([FromBody] CreateGTAVersionDTO model)
        {
            var createdGTAVersionId = await _gtaVersionService.CreateGTAVersion(model.Image, model.Name, model.Information);

            return Ok(createdGTAVersionId);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGTAVersion([FromRoute] string id, [FromBody] UpdateGTAVersionDTO model)
        {
            var updatedGTAVersion = await _gtaVersionService.UpdateGTAVersion(id, model.Image, model.Name, model.Information);

            return Ok(updatedGTAVersion);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGTAVersion([FromRoute] string id)
        {
            var deletedGTAVersion = await _gtaVersionService.DeleteGTAVersion(id);

            return Ok(deletedGTAVersion);
        }
    }
}
