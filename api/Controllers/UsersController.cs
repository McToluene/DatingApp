using System.Collections.Generic;
using System.Threading.Tasks;
using api.Dtos;
using api.Models;
using api.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  [Authorize]
  public class UsersController : ControllerBase
  {
    private readonly IDatingRepository repository;
    private readonly IMapper mapper;
    public UsersController(IDatingRepository repository, IMapper mapper)
    {
      this.mapper = mapper;
      this.repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
      IEnumerable<User> users = await repository.GetUsers();
      IEnumerable<UserForListDto> usersToReturn = mapper.Map<IEnumerable<UserForListDto>>(users);
      return Ok(usersToReturn);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
      User user = await repository.GetUser(id);
      UserForDetailedDto userToReturn = mapper.Map<UserForDetailedDto>(user);
      return Ok(userToReturn);
    }
  }
}