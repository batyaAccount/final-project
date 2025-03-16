using ApiBusiness.CORE.Dto;
using ApiBusiness.CORE.Entities;
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
        Task<UserDto> GetByIdAsync(int id);
        Task<UserDto> GetByNameAsync(string name);
        Task<bool> UpdateAsync(int id, UserDto user);
        public Task<UserRoles> AuthenticateAsync(string username, string password);
    }
}
