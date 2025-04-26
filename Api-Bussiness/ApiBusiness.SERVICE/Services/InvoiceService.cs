using ApiBusiness.CORE.Dto;
using ApiBusiness.CORE.Entities;
using ApiBusiness.CORE.IRepositories;
using ApiBusiness.CORE.IServices;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using static ApiBusiness.CORE.Entities.Predicates;

namespace ApiBusiness.SERVICE.Services
{
    public class InvoiceService : IInvoiceService
    {
        private readonly IInvoiceRepository _invoiceRepository;
        private readonly IRepositoryManager _repositoryManager;
        private readonly IFinancialTransactionService _financialTransactionService;
        private readonly IS3Service _s3Service;
        private readonly IMapper _mapper;

        public InvoiceService(IS3Service s3Service, IFinancialTransactionService financialTransactionService, IInvoiceRepository invoiceRepository, IRepositoryManager repositoryManager, IMapper mapper)
        {
            _invoiceRepository = invoiceRepository;
            _repositoryManager = repositoryManager;
            _financialTransactionService = financialTransactionService;
            _mapper = mapper;
            _s3Service = s3Service;
        }

        public async Task<InvoiceDto> AddAsync(InvoiceDto invoice)
        {
            if (await GetByIdAsync(invoice.Id) != null)
                return null;
            var rD = _mapper.Map<Invoices>(invoice);
            rD.Update = false;
            FinancialTransaction financialTransaction = new FinancialTransaction()
            {
                Amount = rD.Amount,
                Timestamp = rD.Date,
                Type = rD.Category,

            };
            var f = await _financialTransactionService.AddAsync(financialTransaction);
            rD.FinancialTransaction = f;
            Invoices r = await _invoiceRepository.AddAsync(rD);
            await _repositoryManager.SaveAsync();
            var r2 = _mapper.Map<InvoiceDto>(r);
            return r2;
        }

        /// <summary>
        ///של חשבונית ששמורה בענן ומכניסה נתונים לטבלת חשבוניות url פונקציה זו מקבלת ניתוב ל 
        /// </summary>
        /// <param name="invoiceUrl"></param>
        /// <returns></returns>
        public async Task<InvoiceDto> AddByUrlAsync(string userId, string fileName)
        {
            InvoiceDto receipeDto = new InvoiceDto();
            var client = new RestClient("https://app.nanonets.com/api/v2/OCR/Model/0b2a69ae-c240-42d6-a8bd-cade12838663/LabelFile/?async=false");
            var request = new RestRequest("", Method.Post);

            request.AddHeader("Authorization", "Basic " + Convert.ToBase64String(Encoding.UTF8.GetBytes("6dadde48-f559-11ef-8bef-22cdfa4e5554:")));
            request.AddHeader("Accept", "multipart/form-data");
            // שמירת הקובץ הזמני

            // הוסף את הנתיב של הקובץ שאתה רוצה לשלוח
            var url = await _s3Service.GetDownloadUrlAsync(userId, fileName);

            //request.AddFile("file", url2);
            using (var httpClient = new HttpClient())
            {
                var fileBytes = await httpClient.GetByteArrayAsync(url);
                var tempFilePath = Path.GetTempFileName(); // יוצר קובץ זמני
                await System.IO.File.WriteAllBytesAsync(tempFilePath, fileBytes);

                request.AddFile("file", tempFilePath);
            }

            var response = await client.ExecuteAsync(request);

            if (response.IsSuccessful)
            {

                // Deserialize the response content into a PredictionResponse object
                var predictionResponse = JsonConvert.DeserializeObject<PredictionResponse>(response.Content);
                if (predictionResponse != null && predictionResponse.Result != null)
                {
                    // Iterate through the predictions array and extract relevant data
                    foreach (var result in predictionResponse.Result)
                    {
                        foreach (var prediction in result.Prediction)
                        {

                            switch (prediction.Label)
                            {
                                case "seller_name":
                                    receipeDto.Supplier = prediction.Ocr_text;
                                    break;
                                case "invoice_amount":
                                    receipeDto.Amount = double.Parse(prediction.Ocr_text);
                                    break;
                                case "invoice_date":
                                    try
                                    {
                                        receipeDto.Date = DateTime.Parse(prediction.Ocr_text);
                                        receipeDto.Date = DateTime.SpecifyKind(receipeDto.Date, DateTimeKind.Utc);

                                    }
                                    catch
                                    {
                                        receipeDto.Date = DateTime.UtcNow;
                                    }
                                    break;
                                default:

                                    break;
                            }


                        }
                    }
                    if (receipeDto.Amount == null)
                        receipeDto.Amount = 0;
                    if (receipeDto.Supplier == null)
                        receipeDto.Supplier = " ";
                    return await AddAsync(receipeDto);
                }
                else
                {
                    return null;
                }

            }
            else
            {
                return null;
            }

        }
        public async Task<InvoiceDto> ConfirmReceipeAsync(int id)
        {
            var r = await _invoiceRepository.GetByIdAsync(id);
            r.Update = true;
            var rD = _mapper.Map<InvoiceDto>(r);
            await _repositoryManager.SaveAsync();
            return rD;
        }
        public async Task DeleteAsync(int id)
        {
            await _invoiceRepository.DeleteAsync(id);
            await _repositoryManager.SaveAsync();
        }

        public async Task<IEnumerable<InvoiceDto>> GetAllAsync()
        {

            return _mapper.Map<IEnumerable<InvoiceDto>>(await _invoiceRepository.GetAsync());
        }

        public async Task<InvoiceDto> GetByIdAsync(int id)
        {
            var r = await _invoiceRepository.GetByIdAsync(id);
            return _mapper.Map<InvoiceDto>(r);
        }

        public async Task<bool> UpdateAsync(int id, InvoiceDto invoice)
        {
            var reD = _mapper.Map<Invoices>(invoice);
            reD.Update = true;
            bool f = await _invoiceRepository.UpdateAsync(id, reD);
            await _repositoryManager.SaveAsync();
            return f;
        }
    }
}
