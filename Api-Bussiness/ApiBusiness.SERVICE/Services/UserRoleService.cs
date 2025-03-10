using ApiBusiness.CORE.Dto;
using ApiBusiness.CORE.Entities;
using ApiBusiness.CORE.IRepositories;
using ApiBusiness.CORE.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.SERVICE.Services
{
    public class UserRoleService: IUserRoleService
    {
        private readonly IUserRolesRepository _userRolesRepository;
        private readonly IRoleRpository _roleRpository;
        private readonly IRepositoryManager _repositoryManager;

        public UserRoleService(IUserRolesRepository userRolesRepository, IRoleRpository roleRpository,IRepositoryManager repositoryManager)
        {
            _userRolesRepository = userRolesRepository;
            _roleRpository = roleRpository;
            _repositoryManager = repositoryManager;

        }
        public async Task<UserRoles> AddAsync(string role,int userId)
        {
            var r = await _roleRpository.GetIdByRoleAsync(role);
            if (r == null)
                return null;
            UserRoles u = await _userRolesRepository.AddAsync(new UserRoles { RoleId = r.Id , UserId = userId});
            await _repositoryManager.SaveAsync();
            return u;
        }
    }
}
