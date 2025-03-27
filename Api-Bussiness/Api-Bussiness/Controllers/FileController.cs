using Api_Bussiness.API.PostEntity;
using ApiBusiness.CORE.Dto;
using ApiBusiness.CORE.Entities;
using ApiBusiness.CORE.IServices;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Api_Bussiness.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public FileController(IFileService fileService, IMapper mapper, IUserService userService)
        {
            _fileService = fileService;
            _mapper = mapper;
            _userService = userService;
        }

        [HttpGet("admin-only")]
        [Authorize(Policy = "AdminOnly")] // רק Admin יכול לגשת
        public async Task<IActionResult> getAllInvoices()
        {
            var invoices = await _fileService.GetAllAsync();
            var invoiceDto = _mapper.Map<ApiBusiness.CORE.Entities.File>(invoices);
            return Ok(invoiceDto);
        }

        [HttpGet("accountant/{clientId}")]
        [Authorize(Policy = "AccountantAndClient")] //Accountant can access
        public async Task<IActionResult> AccountantAsync(int clientId)
        {
            var userClaim = User.FindFirstValue(ClaimTypes.Name);
            if (userClaim == null)
            {
                return Unauthorized("User is not authenticated.");
            }
            var accountantId = _userService.GetByNameAsync(userClaim).Result.Id;
            var invoices = await _fileService.GetClientsByAccountantAccessibleProjectsAsync(clientId, accountantId);
            return Ok(invoices);
        }

        [HttpGet("client")]
        [Authorize(Policy = "ClientOnly")] //Client can access
        public async Task<IActionResult> ClientAsync()
        {
            var userClaim = User.FindFirstValue(ClaimTypes.Name);
            if (userClaim == null)
            {
                return Unauthorized("User is not authenticated.");
            }
            var clientId = _userService.GetByNameAsync(userClaim).Result.Id;
            var invoices = await _fileService.GetClientAccessibleProjectsAsync(clientId);
            return Ok(invoices);
        }

        [HttpPost("{category}")]
        [Authorize]
        public async Task<IActionResult> AddAsync([FromBody] FilePostEntity filePostEntity, int category)
        {

            FileDto file = _mapper.Map<FileDto>(filePostEntity);
            var res = await _fileService.AddAsync(category, file);
            return Ok(res);
        }

        [HttpDelete("delete/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteByInvoiceIdAsync(int id)
        {
            var res = await _fileService.DeleteByInvoiceIdAsync(id);
            if (res == true)
                return Ok(res);
            return BadRequest();
        }

        [HttpGet("viewer-only")]
        [Authorize(Policy = "ViewerOnly")] // רק Viewer יכול לגשת
        public IActionResult ViewerOnly()
        {
            return Ok("This is accessible only by Viewers.");
        }



    }
}
