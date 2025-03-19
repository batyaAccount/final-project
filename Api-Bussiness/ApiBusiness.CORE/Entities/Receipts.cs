using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.CORE.Entities
{
    public class Receipts
    {
        [Key]
        public int Id { get; set; } // מזהה ייחודי
        [Required]
        public double Amount { get; set; } // סכום ההוצאה
        [Required]
        public int Category { get; set; } // קטגוריה
        public DateTime Date { get; set; } // תאריך ההוצאה
        public string Supplier { get; set; } // שם הספק
        public int FinancialTransactionId { get; set; }
        public FinancialTransaction FinancialTransaction { get; set; }
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; }
        public bool Update { get; set; }
    }
}
