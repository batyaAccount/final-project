using ApiBusiness.CORE.Dto;
using ApiBusiness.CORE.Entities;
using ApiBusiness.CORE.IRepositories;
using ApiBusiness.CORE.IServices;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiBusiness.SERVICE.Services
{
    public class ReciptService : IReciptService
    {
        private readonly IReciptsRepository _receiptRepository;
        private readonly IRepositoryManager _repositoryManager;
        readonly IMapper _mapper;

        public ReciptService(IReciptsRepository receiptRepository, IRepositoryManager repositoryManager, IMapper mapper)
        {
            _receiptRepository = receiptRepository;
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<ReceipeDto> AddAsync(ReceipeDto receipt)
        {
            if (await GetByIdAsync(receipt.Id) != null)
                return null;
            var rD = _mapper.Map<Receipts>(receipt);
            Receipts r = await _receiptRepository.AddAsync(rD);
            await _repositoryManager.SaveAsync();
            var r2 = _mapper.Map<ReceipeDto>(r);
            return r2;
        }

        public async Task DeleteAsync(int id)
        {
            await _receiptRepository.DeleteAsync(id);
            await _repositoryManager.SaveAsync();
        }

        public async Task<IEnumerable<ReceipeDto>> GetAllAsync()
        {

            return  _mapper.Map<IEnumerable<ReceipeDto>>(await _receiptRepository.GetAsync());
        }

        public async Task<ReceipeDto> GetByIdAsync(int id)
        {
            var r = await _receiptRepository.GetByIdAsync(id);
            return  _mapper.Map<ReceipeDto>(r);
        }

        public async Task<bool> UpdateAsync(int id, ReceipeDto receipt)
        {
            var reD = _mapper.Map<Receipts>(receipt);
            bool f = await _receiptRepository.UpdateAsync(id, reD);
            await _repositoryManager.SaveAsync();
            return f;
        }
    }
}
