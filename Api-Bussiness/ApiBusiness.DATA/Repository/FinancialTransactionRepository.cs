using ApiBusiness.CORE.Entities;
using ApiBusiness.CORE.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.DATA.Repository
{
    public class FinancialTransactionRepository : IFinancialTransactionRepository
    {

        protected readonly DbSet<FinancialTransaction> _dbSet;
        public FinancialTransactionRepository(DataContext context)
        {
            _dbSet = context.FinancialTransaction;
        }

        public async Task<IEnumerable<FinancialTransaction>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<FinancialTransaction> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<FinancialTransaction> AddAsync(FinancialTransaction transaction)
        {
            _dbSet.Add(transaction);
            transaction.CreatedAt = DateTime.UtcNow;
            return transaction;

        }

        public async Task<bool> UpdateAsync(int id, FinancialTransaction transaction)
        {
            FinancialTransaction r = await GetByIdAsync(id);
            if (r != null)
            {
                r.Type = transaction.Type;
                r.Amount = transaction.Amount;
                r.Timestamp = transaction.Timestamp;
                r.Type = transaction.Type;
                r.UpdatedAt = DateTime.UtcNow;

                return true;
            }
            return false;
        }

        public async Task DeleteAsync(int id)
        {
            var transaction = await GetByIdAsync(id);
            _dbSet.Remove(transaction);
        }




    }
}
