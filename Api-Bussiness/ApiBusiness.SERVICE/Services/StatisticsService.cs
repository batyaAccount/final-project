//using ApiBusiness.CORE.IRepositories;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace ApiBusiness.SERVICE.Services
//{
//    public class StatisticsService : IStatisticsService
//    {
//        private readonly IFileRepository _fileRepository;
//        private readonly IUserRepository _userRepository;

//        public StatisticsService(
//            IFileRepository fileRepository,
//            IUserRepository userRepository)
//        {
//            _fileRepository = fileRepository;
//            _userRepository = userRepository;
//        }

//        public async Task<int> GetTotalFilesAsync()
//        {
//            return await _fileRepository.CountAllAsync();
//        }
//        public async Task<int> GetTotalUsersAsync()
//        {
//            return await _userRepository.CountUserTotal();
//        }

//        public async Task<List<DailyStatDto>> GetDailyLoginStatsAsync()
//        {
//            var logins = await _userRepository.GetLoginDatesAsync();
//            return logins
//                .GroupBy(date => date.Date)
//                .Select(g => new DailyStatDto
//                {
//                    Date = g.Key,
//                    Count = g.Count()
//                })
//                .OrderBy(d => d.Date)
//                .ToList();
//        }

//        public async Task<List<DailyStatDto>> GetDailyProjectCreationsAsync()
//        {
//            var creations = await _projectRepository.GetCreateProjectDatesAsync();
//            return creations
//                .GroupBy(date => date.Date)
//                .Select(g => new DailyStatDto
//                {
//                    Date = g.Key,
//                    Count = g.Count()
//                })
//                .OrderBy(x => x.Date)
//                .ToList();
//        }

//    }



//}
