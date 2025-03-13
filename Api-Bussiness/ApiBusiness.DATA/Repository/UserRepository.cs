using ApiBusiness.CORE.Entities;
using ApiBusiness.CORE.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.DATA.Repository
{
    public class UserRepository : IUserRepository
    {
        protected readonly DbSet<Users> _dbSet;
        public UserRepository(DataContext context)
        {
            _dbSet = context.Users;
        }
        public async Task<Users> AddAsync(Users user)
        {
            await _dbSet.AddAsync(user);
            user.CreatedAt = DateTime.UtcNow;
            return user;
        }

        public async Task DeleteAsync(int id)
        {
            var user = await GetByIdAsync(id);
            _dbSet.Remove(user);
        }

        public async Task<IEnumerable<Users>> GetAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<Users> GetByIdAsync(int user)
        {
            return await _dbSet.FindAsync(user);
        }

        public async Task<bool> UpdateAsync(int id, Users user)
        {
            Users r = await GetByIdAsync(id);
            if (r != null)
            {
                r.Email = user.Email;
                r.Name = user.Name;
                r.Password = user.Password;
                r.UpdatedAt = DateTime.UtcNow;
                return true;
            }
            return false;
        }
        public async Task<Users> FindByUsernameAsync(string username)
        {
            return await _dbSet.SingleOrDefaultAsync(u => u.Name == username);
        }
    }
}
