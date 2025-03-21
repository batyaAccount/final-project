using ApiBusiness.CORE.Dto;
using ApiBusiness.CORE.Entities;
using ApiBusiness.CORE.IRepositories;
using ApiBusiness.CORE.IServices;
using AutoMapper;
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
    public class ReciptService : IReciptService
    {
        private readonly IReciptsRepository _receiptRepository;
        private readonly IRepositoryManager _repositoryManager;
        private readonly IFinancialTransactionService _financialTransactionService;
        private readonly IS3Service _s3Service;
        private readonly IMapper _mapper;

        public ReciptService(IS3Service s3Service, IFinancialTransactionService financialTransactionService, IReciptsRepository receiptRepository, IRepositoryManager repositoryManager, IMapper mapper)
        {
            _receiptRepository = receiptRepository;
            _repositoryManager = repositoryManager;
            _financialTransactionService = financialTransactionService;
            _mapper = mapper;
            _s3Service = s3Service;
        }

        public async Task<ReceipeDto> AddAsync(ReceipeDto receipt)
        {
            if (await GetByIdAsync(receipt.Id) != null)
                return null;
            var rD = _mapper.Map<Receipts>(receipt);
            rD.Update = false;
            FinancialTransaction financialTransaction = new FinancialTransaction()
            {
                Amount = rD.Amount,
                Timestamp = rD.Date,
                Type = rD.Category,

            };
            var f = await _financialTransactionService.AddAsync(financialTransaction);
            rD.FinancialTransaction = f;
            Receipts r = await _receiptRepository.AddAsync(rD);
            await _repositoryManager.SaveAsync();
            var r2 = _mapper.Map<ReceipeDto>(r);
            return r2;
        }

        /// <summary>
        ///של חשבונית ששמורה בענן ומכניסה נתונים לטבלת חשבוניות url פונקציה זו מקבלת ניתוב ל 
        /// </summary>
        /// <param name="receiptUrl"></param>
        /// <returns></returns>
        public async Task<ReceipeDto> AddByUrlAsync(string userId, string fileName)
        {
            ReceipeDto receipeDto = new ReceipeDto();
            var client = new RestClient("https://app.nanonets.com/api/v2/OCR/Model/a7776203-11b3-4b5c-ba88-1c38391a7f93/LabelFile/?async=false");
            var request = new RestRequest("", Method.Post);

            request.AddHeader("Authorization", "Basic " + Convert.ToBase64String(Encoding.UTF8.GetBytes("6dadde48-f559-11ef-8bef-22cdfa4e5554:")));
            request.AddHeader("Accept", "multipart/form-data");

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
                                    receipeDto.Date = DateTime.Parse(prediction.Ocr_text);
                                    break;
                                default:
                                    break;
                            }


                        }
                    }
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
        public async Task<ReceipeDto> ConfirmReceipeAsync(int id)
        {
            var r = await _receiptRepository.GetByIdAsync(id);
            r.Update = true;
            var rD = _mapper.Map<ReceipeDto>(r);
            await _repositoryManager.SaveAsync();
            return rD;
        }
        public async Task DeleteAsync(int id)
        {
            await _receiptRepository.DeleteAsync(id);
            await _repositoryManager.SaveAsync();
        }

        public async Task<IEnumerable<ReceipeDto>> GetAllAsync()
        {

            return _mapper.Map<IEnumerable<ReceipeDto>>(await _receiptRepository.GetAsync());
        }

        public async Task<ReceipeDto> GetByIdAsync(int id)
        {
            var r = await _receiptRepository.GetByIdAsync(id);
            return _mapper.Map<ReceipeDto>(r);
        }

        public async Task<bool> UpdateAsync(int id, ReceipeDto receipt)
        {
            var reD = _mapper.Map<Receipts>(receipt);
            reD.Update = true;
            bool f = await _receiptRepository.UpdateAsync(id, reD);
            await _repositoryManager.SaveAsync();
            return f;
        }
    }
}
