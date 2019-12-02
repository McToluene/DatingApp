using System.Linq;
using api.Dtos;
using api.Models;
using AutoMapper;

namespace api.Helpers
{
  public class AutoMapperProfiles : Profile
  {
    public AutoMapperProfiles()
    {
      CreateMap<User, UserForListDto>()
      .ForMember(dest => dest.Age, opt =>
      {
        opt.MapFrom(d => d.DateOfBirth.CalculateAge());
      })
        .ForMember(dest => dest.PhotoUrl, opt =>
        {
          opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
        });
      CreateMap<User, UserForDetailedDto>()
      .ForMember(dest => dest.Age, opt =>
      {
        opt.MapFrom(d => d.DateOfBirth.CalculateAge());
      })
       .ForMember(dest => dest.PhotoUrl, opt =>
        {
          opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
        });
      CreateMap<Photo, PhotosForDetailedDto>();
    }
  }
}