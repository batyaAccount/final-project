using ApiBusiness.CORE.Entities;
using ApiBusiness.CORE.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api_Bussiness.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FinancialTransactionController : ControllerBase
    {

        private readonly IFinancialTransactionService _financialTransactionService;

        public FinancialTransactionController(IFinancialTransactionService financialTransactionService)
        {
            _financialTransactionService = financialTransactionService;
        }

        // GET: api/FinancialTransaction
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FinancialTransaction>>> GetAll()
        {
            var transactions = await _financialTransactionService.GetAllAsync();
            return Ok(transactions);
        }

        // GET: api/FinancialTransaction/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<FinancialTransaction>> GetById(int id)
        {
            var transaction = await _financialTransactionService.GetByIdAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }
            return Ok(transaction);
        }

    }
}

