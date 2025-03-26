using ApiBusiness.CORE.Dto;
using ApiBusiness.CORE.Entities;
using ApiBusiness.CORE.IRepositories;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.CORE.IServices
{
    public interface IFileService
    {
        Task<FileDto> AddAsync(int category,FileDto fileDto);
        Task<bool> DeleteByInvoiceIdAsync(int id);
        Task<IEnumerable<FileDto>> GetUserAccessibleProjectsAsync(int id);
        Task<IEnumerable<FileDto>> GetAllAsync();
        Task<FileDto> GetByIdAsync(int id);
        Task<bool> UpdateAsync(int id, FileDto receipt);
    }
}
