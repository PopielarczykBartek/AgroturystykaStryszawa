using Agroturystyka.API.Dtos;
using Agroturystyka.API.Models;
using AutoMapper;

namespace Agroturystyka.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
        }
    }
}
