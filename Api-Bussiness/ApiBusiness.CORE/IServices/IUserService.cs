using ApiBusiness.CORE.Dto;
using ApiBusiness.CORE.Entities;
using ApiBusiness.CORE.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.CORE.IServices
{
    public interface IUserService
    {
        public Task<UserDto> AddAsync(UserDto user, string roleName);
        Task DeleteAsync(int id);
        Task<IEnumerable<UserDto>> GetAllAsync();
        Task<IEnumerable<UserDto>> GetClientsForAccountantAsync(int id);
        Task<UserDto> GetByIdAsync(int id);
        Task<UserDto> GetByNameAsync(string name);
        Task<bool> UpdateAsync(int id, UserDto user);
        public Task<UserRoles> AuthenticateAsync(string username, string password);
        public Task<int[]> GetUsersPerMonthAsync();
        public  Task<int[]> GetClientPlusAccountant();
    }
}
