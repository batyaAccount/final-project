
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.Util;
using ApiBusiness.CORE.IServices;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.SERVICE.Services
{

    public class S3Service : IS3Service
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;

        public S3Service(IConfiguration configuration)
        {
            var accessKey = configuration["AccessKey"];
            var secretKey = configuration["SecretKey"];
            var region = configuration["Region"];

            
            Console.WriteLine(accessKey);
            Console.WriteLine(secretKey);

            _s3Client = new AmazonS3Client(accessKey, secretKey, Amazon.RegionEndpoint.GetBySystemName(region));
        }
        public async Task<string> GeneratePresignedUrlAsync(string userId, string fileName, string contentType)
        {
          
            var key = $"users/{userId}/{fileName}"; // נתיב כולל תיקיה
            var request = new GetPreSignedUrlRequest
            {
                BucketName = "batyabucket",
                Key = key,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(60),
                ContentType = contentType
                
            };

            return await _s3Client.GetPreSignedURLAsync(request);
        }

        public async Task<string> GetDownloadUrlAsync(string userId,string fileName)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = "batyabucket",
                Key = $"users/{userId}/{fileName}",
                Verb = HttpVerb.GET,
                Expires = DateTime.UtcNow.AddDays(7),
            };

            return await _s3Client.GetPreSignedURLAsync(request);
        }
     
    }
}
