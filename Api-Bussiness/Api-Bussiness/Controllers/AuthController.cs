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
        private readonly ILogger<AuthController> _logger;

        public AuthController(IConfiguration configuration, AuthService authService, IUserService userService, IMapper mapper, ILogger<AuthController> logger)
        {
            _configuration = configuration;
            _authService = authService;
            _userService = userService;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginModel model)
        {
            _logger.LogInformation("This is a log message from the controller during a GET request.");

            Console.WriteLine("The model:" + model);
            var role = await _userService.AuthenticateAsync(model.Name, model.Password);
            if (role != null)
            {
                if (role.Role.RoleName == "Admin")
                {
                    var token = _authService.GenerateJwtToken(model.Name, new[] { "Admin" });
                    return Ok(new { Token = token, User = role.User });
                }
                else if (role.Role.RoleName == "Accountant")
                {
                    var token = _authService.GenerateJwtToken(model.Name, new[] { "Accountant" });
                    return Ok(new { Token = token, User = role.User });
                }
                else if (role.Role.RoleName == "Client")
                {
                    var token = _authService.GenerateJwtToken(model.Name, new[] { "Client" });
                    return Ok(new { Token = token, User = role.User });
                }
            }
            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterModel model)
        {

            _logger.LogInformation("register - - This is a log message from the controller during a GET request.");

            if (model == null)
            {
                return Conflict("User is not valid");
            }
            var modelD = _mapper.Map<UserDto>(model);
            var existingUser = await _userService.AddAsync(modelD,model.RoleName);
            if (existingUser == null)
                return BadRequest();
            var token = _authService.GenerateJwtToken(model.Name, new[] { model.RoleName });
            var user = _userService.GetByIdAsync(existingUser.Id);
            return Ok(new { Token = token ,User = user.Result});

        }
    }
}

