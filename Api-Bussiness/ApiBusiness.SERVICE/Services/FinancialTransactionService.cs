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
    public class FinancialTransactionService : IFinancialTransactionService
    {
        private readonly IFinancialTransactionRepository _financialTransactionRepository;
        private readonly IRepositoryManager _repositoryManager;

        public FinancialTransactionService(IFinancialTransactionRepository financialTransactionRepository, IRepositoryManager repositoryManager)
        {
            _financialTransactionRepository = financialTransactionRepository;
            _repositoryManager = repositoryManager;
        }
        public async Task<FinancialTransaction> AddAsync(FinancialTransaction transaction)
        {
            if (await GetByIdAsync(transaction.Id) != null)
                return null;
            FinancialTransaction u = await _financialTransactionRepository.AddAsync(transaction);
            if (u == null)
                return null;
            return u;
        }
        public async Task DeleteAsync(int id)
        {
            await _financialTransactionRepository.DeleteAsync(id);
            await _repositoryManager.SaveAsync();
        }
        public async Task<IEnumerable<FinancialTransaction>> GetAllAsync()
        {
            return await _financialTransactionRepository.GetAllAsync();
        }
        public async Task<FinancialTransaction> GetByIdAsync(int id)
        {
            return await _financialTransactionRepository.GetByIdAsync(id);
        }
       
        public async Task<bool> UpdateAsync(int id, FinancialTransaction user)
        {

            bool f = await _financialTransactionRepository.UpdateAsync(id, user);
            await _repositoryManager.SaveAsync();
            return f;
        }
    
    }
}
