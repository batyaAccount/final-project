//using Amazon.S3.Encryption.Internal;
//using ApiBusiness.CORE.IServices;
//using ApiBusiness.SERVICE.Services;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace Api_Bussiness.API.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class StatisticsController : ControllerBase
//    {
//        private readonly IStatisticsService _statisticsService;
//        private readonly IUserService _userService; 

//        public StatisticsController(IStatisticsService statisticsService,IUserService userService)
//        {
//            _statisticsService = statisticsService;
//            _userService = userService;
//        }

//        [HttpGet("total-files")]
//        public async Task<IActionResult> GetTotalFiles()
//        {
//            var count = await _statisticsService.GetTotalFilesAsync();
//            return Ok(count);
//        }
//        [HttpGet("total-users")]
//        public async Task<IActionResult> GetTotalUsers()
//        {
//            var count = await _statisticsService.GetTotalUsersAsync();
//            return Ok(count);
//        }

//        [HttpGet("daily-logins")]
//        //public async Task<IActionResult> GetDailyLogins()
//        //{
//        //    try
//        //    {
//        //        var data = await _statisticsService.GetDailyLoginStatsAsync();
//        //        return Ok(data);
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        Console.WriteLine($"Error in GetDailyLogins: {ex.Message}");
//        //        return StatusCode(500, "Internal server error");
//        //    }
//        //}

//        [HttpGet("per-month")]
//        public async Task<ActionResult<int[]>> GetUsersPerMonth()
//        {
//            var result = await _userService.GetUsersPerMonthAsync();
//            return Ok(result);
//        }

//    }
//}
