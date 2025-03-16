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


        [HttpGet("editor-or-admin")]
        [Authorize(Policy = "EditorOrAdmin")] // Editor או Admin יכולים לגשת
        public async Task<IActionResult> EditorOrAdminAsync()
        {
            var userClaim = User.FindFirstValue(ClaimTypes.Name);
            if (userClaim == null)
            {
                return Unauthorized("User is not authenticated.");
            }
            var userId = _userService.GetByNameAsync(userClaim).Result.Id;
            var invoices = await _fileService.GetUserAccessibleProjectsAsync(userId);
            return Ok(invoices);
        }


        //[HttpGet("viewer-only")]
        //[Authorize(Policy = "ViewerOnly")] // רק Viewer יכול לגשת
        //public IActionResult ViewerOnly()
        //{
        //    return Ok("This is accessible only by Viewers.");
        //}



    }
}
