using ApiBusiness.CORE.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.CORE.IServices
{
    public interface IUserRoleService
    {
        public  Task<UserRoles> AddAsync(string role, int userId);

    }
}
