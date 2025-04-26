using ApiBusiness.CORE.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.CORE.IRepositories
{
    public interface IInvoiceRepository
    {
        public Task<IEnumerable<Invoices>> GetAsync();
        public Task<Invoices> GetByIdAsync(int receipt);
        public Task<Invoices> AddAsync(Invoices receipt);
        public Task<bool> UpdateAsync(int id, Invoices receipt);
        public Task DeleteAsync(int id);
    }
}
