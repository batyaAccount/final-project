using ApiBusiness.CORE.Dto;
using ApiBusiness.CORE.Entities;
using ApiBusiness.CORE.IRepositories;
using ApiBusiness.CORE.IServices;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.SERVICE.Services
{
    public class UserService :IUserService
        
    {
        private readonly IUserRepository _userRepository;
        private readonly IRepositoryManager _repositoryManager;
        private readonly IRoleRpository _roleRpository;
       private readonly IMapper _mapper;
       private readonly IUserRolesRepository _userRolesRepository;


        public UserService(IUserRepository userRepository, IRepositoryManager repositoryManager ,IMapper mapper,IUserRolesRepository userRolesRepository)
        {
            _userRepository = userRepository;
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _userRolesRepository = userRolesRepository;

        }

        public async Task<UserDto> AddAsync(UserDto user)
        {
            var user2 = _mapper.Map<Users>(user);
            if (await GetByIdAsync(user.Id) != null)
                return null;

            Users u = await _userRepository.AddAsync(user2);
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
            return  _mapper.Map<IEnumerable<UserDto>>(await _userRepository.GetAsync());
        }

        public async Task<UserDto> GetByIdAsync(int id)
        {
            return  _mapper.Map<UserDto>(await _userRepository.GetByIdAsync(id));
        }

        public async Task<bool> UpdateAsync(int id, UserDto user)
        {
            var user2 = _mapper.Map<Users>(user);

            bool f =  await _userRepository.UpdateAsync(id, user2);
            await _repositoryManager.SaveAsync();
            return f;
        }
     
        public async Task<string> AuthenticateAsync(string username, string password)
        {
            Users user = await _userRepository.FindByUsernameAsync(username); 
            if (user == null || !user.Password.Equals(password)) 
            {
                return null; 
            }
            var userRole = await _userRolesRepository.GetByUserIdAsync(user.Id);
            if (userRole == null)
                return null;
      
            return userRole.Role.RoleName;
        }
    }
}
