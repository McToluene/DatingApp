using System.Security.Claims;
using System.Threading.Tasks;
using api.Dtos;
using api.Models;
using api.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;

namespace api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly IAuthRepository repository;
    private readonly IConfiguration configuration;
    public AuthController(IAuthRepository repository, IConfiguration configuration)
    {
      this.configuration = configuration;
      this.repository = repository;

    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserForRegisterDto registerDto)
    {
      registerDto.Username = registerDto.Username.ToLower();

      if (await repository.UserExists(registerDto.Username))
        return BadRequest("Username already exists");

      var userToCreate = new User
      {
        Username = registerDto.Username
      };

      var createdUser = await repository.Register(userToCreate, registerDto.Password);
      return StatusCode(201);

    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(UserForLoginDto userDto)
    {
      User userFromRepo = await repository.Login(userDto.Username.ToLower(), userDto.Password);
      if (userFromRepo == null)
        return Unauthorized();

      Claim[] claims = new Claim[] {
        new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
        new Claim(ClaimTypes.Name, userFromRepo.Username)
      };

      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("AppSettings:Token").Value));
      SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

      SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTime.Now.AddHours(1),
        SigningCredentials = credentials
      };

      JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
      SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

      return Ok(new
      {
        token = tokenHandler.WriteToken(token)
      });
    }
  }
}