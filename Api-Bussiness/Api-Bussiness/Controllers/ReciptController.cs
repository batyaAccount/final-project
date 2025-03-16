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
    public class ReciptController : ControllerBase
    {
        private readonly IReciptService _receiptService;
        private readonly IMapper _mapper;


        public ReciptController(IReciptService receiptService,IMapper mapper)
        {
            _receiptService = receiptService;
            _mapper = mapper;
        }

        // GET: api/<ReciptController>
        [HttpGet]

        public async Task<ActionResult<IEnumerable<ReceipeDto>>> GetAsync()
        {
            var receipts = await _receiptService.GetAllAsync();
            return Ok(receipts);
        }

        // GET api/<ReciptController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReceipeDto>> GetAsync(int id)
        {
            var receipt =await _receiptService.GetByIdAsync(id);
            if (receipt == null)
            {
                return NotFound();
            }
            return Ok(receipt);
        }

        // POST api/<ReciptController>
        [HttpPost]
        public async Task<ActionResult<ReceipeDto>> PostAsync([FromBody] ReceipePostEntity receipt)
        {
            var receiptD = _mapper.Map<ReceipeDto>(receipt);
            var createdReceipt = await _receiptService.AddAsync(receiptD);
            if (createdReceipt == null)
                return BadRequest();
            return Ok(createdReceipt);
        }

        // PUT api/<ReciptController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] ReceipePostEntity receipt)
        {
            var receiptD = _mapper.Map<ReceipeDto>(receipt);

            if (! await _receiptService.UpdateAsync(id, receiptD))
            {
                return NotFound();
            }
            return Ok();
        }
        [HttpPut("confirm/{id}")]
        public async Task<IActionResult> ConfirmAsync(int id)
        { 
            var re = await _receiptService.ConfirmReceipeAsync(id) == null;
            if (re== null)
            {
                return NotFound();
            }
            return Ok(re);
        }

        // DELETE api/<ReciptController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
           await _receiptService.DeleteAsync(id);
            return NoContent();
        }
    }
}
