using ApiBusiness.CORE.Entities;
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
        public int Category { get; set; } 
        public DateTime Date { get; set; } 
        public string Supplier { get; set; } 
        public bool Update { get; set; }
    }
}
