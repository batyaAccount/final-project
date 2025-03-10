using ApiBusiness.CORE.Dto;
using ApiBusiness.CORE.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Collections.Specialized.BitVector32;

namespace ApiBusiness.CORE
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<Users, UserDto>().ReverseMap();
            CreateMap<Receipts, ReceipeDto>().ReverseMap();
            
        }
    }
}
