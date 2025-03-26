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
    public class ReciptRepository : IReciptsRepository
    {
        protected readonly DbSet<Receipts> _dbSet;
        public ReciptRepository(DataContext context)
        {
            _dbSet = context.Recipts;
        }
        public async Task<Receipts> AddAsync(Receipts receipt)
        {
            await _dbSet.AddAsync(receipt);
            receipt.CreatedAt = DateTime.UtcNow;
            return receipt;
        }

        public async Task DeleteAsync(int id)
        {
            var r = await GetByIdAsync(id);
            _dbSet.Remove(r);
        }

        public async Task<IEnumerable<Receipts>> GetAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<Receipts> GetByIdAsync(int receipt)
        {
           return await _dbSet.FindAsync(receipt);
        }

        public async Task<bool> UpdateAsync(int id, Receipts receipt)
        {
            Receipts r =await GetByIdAsync(id);
            if (r != null)
            {
                r.Supplier = receipt.Supplier;
                r.Date = receipt.Date;
                r.Category = receipt.Category;
                r.Amount = receipt.Amount;
                r.Supplier = receipt.Supplier;
                r.UpdatedAt = DateTime.UtcNow;
                r.Update = true;
                return true;
            }
            return false;
        }
    }
}
