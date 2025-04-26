using Api_Bussiness.API.PostEntity;
using ApiBusiness.CORE.Dto;
using ApiBusiness.CORE.Entities;
using AutoMapper;

namespace Api_Bussiness.API
{
    public class MappingProfilePostEntity:Profile
    {
        public MappingProfilePostEntity()
        {

            CreateMap<UserPostEntity, UserDto>().ReverseMap();
            CreateMap<InvoicePostEntity, InvoiceDto>().ReverseMap();
            CreateMap<RegisterModel, UserDto>().ReverseMap();
            CreateMap<ApiBusiness.CORE.Entities.File, FileDto>().ReverseMap();
            CreateMap<FilePostEntity, FileDto>().ReverseMap();
        }
    }
}
