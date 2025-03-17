using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.CORE.Entities
{
    public enum TransactionType
    {
        INCOME,
        EXPENSE
    }

    public class FinancialTransaction
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int Type { get; set; }  
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public double Amount { get; set; }
        [Required]
        public DateTime Timestamp { get; set; } 
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; } 

    }
}
