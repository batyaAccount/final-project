﻿using System.ComponentModel.DataAnnotations;

namespace Api_Bussiness.API.PostEntity
{
    public class InvoicePostEntity
    {
        public double Amount { get; set; }
        public int Category { get; set; } 
        public DateTime Date { get; set; } 
        public string Supplier { get; set; } 
    }
}
