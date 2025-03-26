using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.CORE.IRepositories
{
    public interface IFileRepository
    {
        Task<CORE.Entities.File> AddAsync(CORE.Entities.File file);
        Task<CORE.Entities.File> GetByIdAsync(int id);
        Task<IEnumerable<CORE.Entities.File>> GetAllAsync();
        Task<bool> UpdateAsync(int id, CORE.Entities.File role);
        Task<IEnumerable<CORE.Entities.File>> GetUserAccessibleProjectsAsync(int userId);

        Task<bool> DeleteByInvoiceIdAsync(int id);
    }
}
