﻿using Api_Bussiness.API.PostEntity;
using ApiBusiness.CORE.Dto;
using AutoMapper;

namespace Api_Bussiness.API
{
    public class MappingProfilePostEntity:Profile
    {
        public MappingProfilePostEntity()
        {

            CreateMap<UserPostEntity, UserDto>().ReverseMap();
            CreateMap<ReceipePostEntity, ReceipeDto>().ReverseMap();
            CreateMap<RegisterModel, UserDto>().ReverseMap();
        }
    }
}
