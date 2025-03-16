using Amazon.S3;
using Amazon.S3.Model;
using ApiBusiness.CORE.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_Bussiness.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IAmazonS3 _s3Client;
        private readonly IReciptService _reciptService;

        public UploadController(IAmazonS3 s3Client, IReciptService receiptService)
        {
            _s3Client = s3Client;
            _reciptService = receiptService;
        }

        [HttpGet("presigned-url")]
        public async Task<IActionResult> GetPresignedUrlAsync([FromQuery] string fileName)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = "your-bucket-name",
                Key = fileName,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(5),
                ContentType = "image/jpeg" // או סוג הקובץ המתאים
            };

            string url = _s3Client.GetPreSignedURL(request);
            //כאן צריך להוסיף פונ' של הוספת file
            return Ok(new { url });
        }
    }
}
