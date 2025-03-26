using ApiBusiness.CORE.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.CORE.Dto
{
    public class FileDto
    {
        public string FileName { get; set; }
        public string FileType { get; set; }
        public long Size { get; set; }
        public string S3Key { get; set; }
        public int ReceiptId { get; set; }
        //public int FolderId { get; set; }
        public int OwnerId { get; set; }
    }
}
