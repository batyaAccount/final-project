using ApiBusiness.CORE.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.CORE.IServices
{
    public interface IFinancialTransactionService
    {
        Task<IEnumerable<FinancialTransaction>> GetAllAsync();
        Task<FinancialTransaction> GetByIdAsync(int id);
        Task<FinancialTransaction> AddAsync(FinancialTransaction transaction);
        Task<bool> UpdateAsync(int id,FinancialTransaction transaction);
        Task DeleteAsync(int id);
    }
}
