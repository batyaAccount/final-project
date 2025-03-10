using Api_Bussiness.API.PostEntity;
using ApiBusiness.CORE.Dto;
using ApiBusiness.CORE.Entities;
using ApiBusiness.CORE.IServices;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api_Bussiness.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAsync()
        {
            var users = await _userService.GetAllAsync();
            var userDtos = _mapper.Map<IEnumerable<UserDto>>(users);
            return Ok(userDtos);
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetAsync(int id)
        {
            var user = await _userService.GetByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            var userDto = _mapper.Map<UserDto>(user);
            return Ok(userDto);
        }


        // POST api/<UserController>
        [HttpPost]
        public async Task<ActionResult<UserDto>> PostAsync([FromBody] UserPostEntity userDto)
        {
            var user = _mapper.Map<UserDto>(userDto);
            var createdUser =await _userService.AddAsync(user);
            if (createdUser == null)
                return BadRequest();
            return Ok(createdUser);
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] UserPostEntity userDto)
        {
            var user = _mapper.Map<UserDto>(userDto);
            if (! await _userService.UpdateAsync(id, user))
            {
                return NotFound();
            }
            return Ok();
        }
        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
           await _userService.DeleteAsync(id);
            return NoContent();
        }
    }
}
