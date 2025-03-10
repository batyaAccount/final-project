using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.CORE.Dto
{
    public class ReceipeDto
    {
        public int Id { get; set; } 
        public double Amount { get; set; } 
        public string Category { get; set; } 
        public DateTime Date { get; set; } 
        public string Supplier { get; set; } 
        public string Url { get; set; }
    }
}
