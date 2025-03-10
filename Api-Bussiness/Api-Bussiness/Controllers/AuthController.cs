using Api_Bussiness.API.PostEntity;
using ApiBusiness.CORE;
using ApiBusiness.CORE.Dto;
using ApiBusiness.CORE.Entities;
using ApiBusiness.CORE.IServices;
using ApiBusiness.SERVICE.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api_Bussiness.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly AuthService _authService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        IUserRoleService _userRoleService;
        public AuthController(IConfiguration configuration, AuthService authService, IUserService userService, IMapper mapper, IUserRoleService userRoleService)
        {
            _configuration = configuration;
            _authService = authService;
            _userService = userService;
            _mapper = mapper;
            _userRoleService = userRoleService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginModel model)
        {
            var roleName = await _userService.AuthenticateAsync(model.Name, model.Password);
            if (roleName == "admin")
            {
                var token = _authService.GenerateJwtToken(model.Name, new[] { "Admin" });
                return Ok(new { Token = token });
            }
            else if (roleName == "editor")
            {
                var token = _authService.GenerateJwtToken(model.Name, new[] { "Editor" });
                return Ok(new { Token = token });
            }
            else if (roleName == "viewer")
            {
                var token = _authService.GenerateJwtToken(model.Name, new[] { "Viewer" });
                return Ok(new { Token = token });
            }

            return Unauthorized();
        }
        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterModel model)
        {
            if (model == null)
            {
                return Conflict("User is not valid");
            }
            var modelD = _mapper.Map<UserDto>(model);
            var existingUser = await _userService.AddAsync(modelD);
            if (existingUser == null)
                return BadRequest();
            var userRole = await _userRoleService.AddAsync(model.RoleName, existingUser.Id);
            if (userRole == null)
                return BadRequest();
            var token = _authService.GenerateJwtToken(model.Name, new[] { model.RoleName });
            return Ok(new { Token = token });


        }
    }
}

