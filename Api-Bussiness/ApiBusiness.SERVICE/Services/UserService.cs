using ApiBusiness.CORE.Dto;
using ApiBusiness.CORE.Entities;
using ApiBusiness.CORE.IRepositories;
using ApiBusiness.CORE.IServices;
using AutoMapper;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.SERVICE.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IRepositoryManager _repositoryManager;
        private readonly IRoleRpository _roleRpository;
        private readonly IMapper _mapper;
        private readonly IUserRolesRepository _userRolesRepository;
        private readonly ILogger<UserService> _logger;

        public UserService(IRoleRpository roleRpository, IUserRepository userRepository, IRepositoryManager repositoryManager, IMapper mapper, IUserRolesRepository userRolesRepository,ILogger<UserService> logger)
        {
            _userRepository = userRepository;
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _userRolesRepository = userRolesRepository;
            _roleRpository = roleRpository;
            _logger = logger;
        }
        public async Task<UserDto> AddAsync(UserDto user, string roleName)
        {
            var user2 = _mapper.Map<Users>(user);

            if (await GetByIdAsync(user.Id) != null)
            {
                _logger.LogInformation(" user : ####################" + user.Id);
                return null;
            }
            Users u = await _userRepository.AddAsync(user2);
            if (u == null)
                return null;
            var role = await _roleRpository.GetIdByRoleAsync(roleName);
            var userRole = await _userRolesRepository.AddAsync(new UserRoles { Role = role, User = u });
            await _repositoryManager.SaveAsync();
            var user3 = _mapper.Map<UserDto>(u);
            return user3;
        }
        public async Task DeleteAsync(int id)
        {
            await _userRepository.DeleteAsync(id);
            await _repositoryManager.SaveAsync();
        }
        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            return _mapper.Map<IEnumerable<UserDto>>(await _userRepository.GetAsync());
        }
        public async Task<UserDto> GetByIdAsync(int id)
        {
            return _mapper.Map<UserDto>(await _userRepository.GetByIdAsync(id));
        }
        
        public async Task<IEnumerable<UserDto>> GetClientsForAccountantAsync(int id)
        {
            return _mapper.Map<IEnumerable<UserDto>>(await _userRepository.GetClientsForAccountantAsync(id));
        }
        public async Task<UserDto> GetByNameAsync(string name)
        {
            return _mapper.Map<UserDto>(await _userRepository.FindByUsernameAsync(name));
        }
        public async Task<bool> UpdateAsync(int id, UserDto user)
        {
            var user2 = _mapper.Map<Users>(user);

            bool f = await _userRepository.UpdateAsync(id, user2);
            await _repositoryManager.SaveAsync();
            return f;
        }
        public async Task<UserRoles> AuthenticateAsync(string username, string password)
        {
            Users user = await _userRepository.FindByUsernameAsync(username);
            if (user == null || !user.Password.Equals(password))
            {
                return null;
            }
            var userRole = await _userRolesRepository.GetByUserIdAsync(user.Id);
            if (userRole == null)
                return null;

            return userRole;
        }
    }
}
