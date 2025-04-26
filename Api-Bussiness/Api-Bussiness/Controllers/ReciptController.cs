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
        private readonly IInvoiceService _invoiceService;
        private readonly IMapper _mapper;


        public ReciptController(IInvoiceService invoiceService,IMapper mapper)
        {
            _invoiceService = invoiceService;
            _mapper = mapper;
        }

        // GET: api/<ReciptController>
        [HttpGet]

        public async Task<ActionResult<IEnumerable<InvoiceDto>>> GetAsync()
        {
            var receipts = await _invoiceService.GetAllAsync();
            return Ok(receipts);
        }

        // GET api/<ReciptController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InvoiceDto>> GetAsync(int id)
        {
            var receipt =await _invoiceService.GetByIdAsync(id);
            if (receipt == null)
            {
                return NotFound();
            }
            return Ok(receipt);
        }

        // POST api/<ReciptController>
        [HttpPost]
        public async Task<ActionResult<InvoiceDto>> PostAsync([FromBody] InvoicePostEntity receipt)
        {
            var receiptD = _mapper.Map<InvoiceDto>(receipt);
            var createdReceipt = await _invoiceService.AddAsync(receiptD);
            if (createdReceipt == null)
                return BadRequest();
            return Ok(createdReceipt);
        }

        // PUT api/<ReciptController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync( [FromBody] InvoicePostEntity receipt,int id)
        {
            var receiptD = _mapper.Map<InvoiceDto>(receipt);

            if (! await _invoiceService.UpdateAsync(id, receiptD))
            {
                return NotFound();
            }
            return Ok();
        }
        [HttpPut("confirm/{id}")]
        public async Task<IActionResult> ConfirmAsync(int id)
        { 
            var re = await _invoiceService.ConfirmReceipeAsync(id) == null;
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
           await _invoiceService.DeleteAsync(id);
            return NoContent();
        }
    }
}
