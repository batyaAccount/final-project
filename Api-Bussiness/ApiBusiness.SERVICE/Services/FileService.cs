﻿using ApiBusiness.CORE.Dto;
using ApiBusiness.CORE.Entities;
using ApiBusiness.CORE.IRepositories;
using ApiBusiness.CORE.IServices;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using File = ApiBusiness.CORE.Entities.File;


namespace ApiBusiness.SERVICE.Services
{
    public class FileService : IFileService
    {
        private readonly IFileRepository _fileRepository;
        private readonly IRepositoryManager _repositoryManager;
        private readonly IInvoiceService _receiptService;
        private readonly IUserRepository _userRepository;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public FileService(IUserService userService, IUserRepository userRepository, IFileRepository fileRepository, IRepositoryManager repositoryManager, IInvoiceService receiptService, IMapper mapper)
        {
            _fileRepository = fileRepository;
            _repositoryManager = repositoryManager;
            _receiptService = receiptService;
            _mapper = mapper;
            _userService = userService;
            _userRepository = userRepository;
        }

        public async Task<FileDto> AddAsync(int category, FileDto fileDto)
        {

            var invoice = await _receiptService.AddByUrlAsync(fileDto.ClientId.ToString(), fileDto.FileName);
            if (invoice == null)
                return null;
            invoice.Category = category;
            if (invoice == null)
                return null;
            var file = _mapper.Map<File>(fileDto);
            file.CreatedAt = DateTime.UtcNow;
            file.ReceiptId = invoice.Id;
          
            File r = await _fileRepository.AddAsync(file);
            if (r == null)
                return null;
            var fileD = _mapper.Map<FileDto>(r);
            await _repositoryManager.SaveAsync();
            return fileD;
        }
        public async Task<bool> DeleteByInvoiceIdAsync(int id)
        {
            var res = await _fileRepository.DeleteByInvoiceIdAsync(id);
            await _repositoryManager.SaveAsync();
            return res;
        }

        public async Task<IEnumerable<FileDto>> GetAllAsync()
        {

            return _mapper.Map<IEnumerable<FileDto>>(await _fileRepository.GetAllAsync());
        }

        public async Task<FileDto> GetByIdAsync(int id)
        {
            var r = await _fileRepository.GetByIdAsync(id);
            return _mapper.Map<FileDto>(r);
        }
        public async Task<IEnumerable<FileDto>> GetClientAccessibleProjectsAsync(int id)
        {
            var r = await _fileRepository.GetClientAccessibleProjectsAsync(id);
            return _mapper.Map<IEnumerable<FileDto>>(r);
        }
        public async Task<IEnumerable<FileDto>> GetClientsByAccountantAccessibleProjectsAsync(int idClient,int idAccountant)
        {
            var r = await _fileRepository.GetClientsByAccountantAccessibleProjectsAsync(idClient,idAccountant);
            return _mapper.Map<IEnumerable<FileDto>>(r);
        }

        public async Task<bool> UpdateAsync(int id, FileDto receipt)
        {
            var reD = _mapper.Map<File>(receipt);
            reD.UpdatedAt = DateTime.Now;
            bool f = await _fileRepository.UpdateAsync(id, reD);
            await _repositoryManager.SaveAsync();
            return f;
        }
    }
}
