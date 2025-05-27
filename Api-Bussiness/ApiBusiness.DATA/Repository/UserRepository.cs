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
        public async Task<IEnumerable<Users>> GetClientsForAccountantAsync(int id)
        {
            var res = await _dbSet.ToListAsync();
            return res.FindAll(f => f.AccountantId == id);
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
                r.AccountantId = user.AccountantId;
                r.UpdatedAt = DateTime.UtcNow;
                return true;
            }
            return false;
        }
        public async Task<Users> FindByUsernameAsync(string username)
        {
            return await _dbSet.FirstOrDefaultAsync(u => u.Name == username);
        }
        public async Task<int[]> GetUsersPerMonthAsync()
        {
            // יוצר מערך בגודל 12 (לכל חודש בשנה)
            var usersPerMonth = new int[12];

            var users = await _dbSet.ToListAsync();

            foreach (var user in users)
            {
                if (user.CreatedAt.Year != DateTime.UtcNow.Year)
                    continue;

                int month = user.CreatedAt.Month - 1;

                usersPerMonth[month]++;
            }

            return usersPerMonth;
        }
        public async Task<int[]> GetClientPlusAccountant()
        {
            var clients_0_Accountant_1 = new int[2];

            var users = await _dbSet.ToListAsync();

            foreach (var user in users)
            {
                if (user.AccountantId != -1 && user.AccountantId != null)
                    clients_0_Accountant_1[1]++;
                else
                    clients_0_Accountant_1[0]++;

            }

            return clients_0_Accountant_1;
        }
    }
}
