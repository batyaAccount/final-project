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
    public class FileRepository : IFileRepository
    {
        protected readonly DbSet<CORE.Entities.File> _dbSet;
        public FileRepository(DataContext context)
        {
            _dbSet = context.files;
        }
        public async Task<CORE.Entities.File> AddAsync(CORE.Entities.File file)
        {
            await _dbSet.AddAsync(file);
            file.CreatedAt = DateTime.UtcNow;
            return file;
        }
        public async Task<CORE.Entities.File> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }
        public async Task<IEnumerable<CORE.Entities.File>> GetUserAccessibleProjectsAsync(int userId)
        {
            var f = await GetAllAsync();
            return f.Where(p => p.viewUsers.Any(perm => perm.Id == userId) || p.OwnerId == userId && p.IsDeleted == false);
        }


        public async Task<IEnumerable<CORE.Entities.File>> GetAllAsync()
        {
            var files = await _dbSet.ToListAsync();
            return files.FindAll(f => f.IsDeleted == false);
        }

        public async Task<bool> UpdateAsync(int id, CORE.Entities.File role)
        {
            CORE.Entities.File existingRole = await GetByIdAsync(id);
            if (existingRole != null)
            {
                existingRole.Size = role.Size;
                existingRole.FileName = role.FileName;
                existingRole.UpdatedAt = DateTime.UtcNow;
                existingRole.FileType = role.FileType;
                //existingRole.FolderId = role.FolderId;
                existingRole.viewUsers = role.viewUsers;
                existingRole.Owner = role.Owner;
                existingRole.S3Key = role.S3Key;
                existingRole.OwnerId = role.OwnerId;

                return true;
            }
            return false;
        }

        public async Task<bool> DeleteByInvoiceIdAsync(int id)
        {
            var file = await _dbSet.FirstOrDefaultAsync(f => f.ReceiptId == id);
            if (file == null) 
                return false;
            file.IsDeleted = true;
            _dbSet.Remove(file);
            return true;
        }

    }
}
