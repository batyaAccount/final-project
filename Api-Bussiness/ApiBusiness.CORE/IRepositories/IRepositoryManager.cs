using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.CORE.IRepositories
{
    public interface IRepositoryManager
    {
        public IUserRepository Users { get; }
        public IInvoiceRepository Recipts { get; }


        public Task SaveAsync();
    }
}
