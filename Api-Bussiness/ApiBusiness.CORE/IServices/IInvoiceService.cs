using ApiBusiness.CORE.Dto;
using ApiBusiness.CORE.Entities;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.CORE.IServices
{
    public interface IInvoiceService
    {

        Task<InvoiceDto> AddAsync(InvoiceDto receipt);
        Task DeleteAsync(int id);
        Task<IEnumerable<InvoiceDto>> GetAllAsync();
        Task<InvoiceDto> GetByIdAsync(int id);
        Task<bool> UpdateAsync(int id, InvoiceDto receipt);
        Task<InvoiceDto> AddByUrlAsync(string userId,string fileName);
        Task<InvoiceDto> ConfirmReceipeAsync(int id);
    }
}
