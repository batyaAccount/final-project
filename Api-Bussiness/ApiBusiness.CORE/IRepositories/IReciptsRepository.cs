using ApiBusiness.CORE.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.CORE.IRepositories
{
    public interface IReciptsRepository
    {
        public Task<IEnumerable<Receipts>> GetAsync();
        public Task<Receipts> GetByIdAsync(int receipt);
        public Task<Receipts> AddAsync(Receipts receipt);
        public Task<bool> UpdateAsync(int id, Receipts receipt);
        public Task DeleteAsync(int id);
    }
}
