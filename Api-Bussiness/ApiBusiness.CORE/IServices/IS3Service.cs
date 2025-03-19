using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.CORE.IServices
{
    public interface IS3Service
    {
        Task<string> GeneratePresignedUrlAsync(string userId, string fileName, string contentType);
        Task<string> GetDownloadUrlAsync(string userId, string fileName);


    }
}
