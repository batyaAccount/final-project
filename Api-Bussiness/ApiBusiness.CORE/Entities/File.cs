using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.CORE.Entities
{
    public class File
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(255)]
        public string FileName { get; set; }
        [MaxLength(50)]
        public string FileType { get; set; }
        public long Size { get; set; }
        [MaxLength(500)]
        public string S3Key { get; set; }
        public int ReceiptId { get; set; }
        public Invoices Receipt { get; set; }
        public int ClientId { get; set; }
        public Users Client { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }
    }
}
