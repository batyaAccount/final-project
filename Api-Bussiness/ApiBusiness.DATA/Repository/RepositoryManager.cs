using ApiBusiness.CORE.Entities;
using ApiBusiness.CORE.IRepositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Collections.Specialized.BitVector32;

namespace ApiBusiness.DATA.Repository
{
    public class RepositoryManager :IRepositoryManager
    {
        private readonly DataContext _context;
        public IUserRepository Users { get; }
        public IInvoiceRepository Recipts { get; }
        
        public RepositoryManager(DataContext context, IUserRepository User, IInvoiceRepository Recipts)
        {
            _context = context;
            Users = User;
            this.Recipts = Recipts;
        }

        public async Task SaveAsync()
        {
           await _context.SaveChangesAsync();
        }
    }
}
