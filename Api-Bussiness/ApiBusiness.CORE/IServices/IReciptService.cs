using ApiBusiness.CORE.Dto;
using ApiBusiness.CORE.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.CORE.IServices
{
    public interface IReciptService
    {

        Task<ReceipeDto> AddAsync(ReceipeDto receipt);
        Task DeleteAsync(int id);
        Task<IEnumerable<ReceipeDto>> GetAllAsync();
        Task< ReceipeDto> GetByIdAsync(int id);
        Task<bool> UpdateAsync(int id, ReceipeDto receipt);
    }
}
