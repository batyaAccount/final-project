using Amazon.S3;
using Amazon.S3.Model;
using ApiBusiness.CORE.Dto;
using ApiBusiness.CORE.Entities;
using ApiBusiness.CORE.IServices;
using ApiBusiness.SERVICE.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Api_Bussiness.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IS3Service _s3Service;
        private readonly IFileService _fileService;
        public UploadController( IS3Service s3Service,IFileService fileService)
        {
            _s3Service = s3Service;
            _fileService = fileService;
        }

        [HttpGet("presigned-url")]
        public async Task<IActionResult> GetPresignedUrlAsync([FromQuery] string userId, [FromQuery] string fileName, [FromQuery] string contentType, [FromQuery] int category, [FromQuery] int fileSize)
        {

            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(fileName))
                return BadRequest("Missing userId or fileName");
            var url = await _s3Service.GeneratePresignedUrlAsync(userId, fileName, contentType);
            FileDto f = new FileDto()
            {
                FileName = fileName,
                FileType = contentType,
                OwnerId = int.Parse(userId),
                S3Key = $"users/{userId}/{fileName}",
                Size = fileSize,
            };
            var res = await _fileService.AddAsync(category, f);

            return Ok(new { url });
        }


        [HttpGet("download-url/{fileName}")]
        public async Task<IActionResult> GetDownloadUrl([FromQuery] string userId, string fileName)
        {
            var url = await _s3Service.GetDownloadUrlAsync(userId, fileName);
            return Ok(new { downloadUrl = url });
        }
    }
}
