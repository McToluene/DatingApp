using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class WeatherForecastController : ControllerBase
  {
    private static readonly string[] Summaries = new[]
    {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

    private readonly ILogger<WeatherForecastController> _logger;
    private readonly DataContext context;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, DataContext context)
    {
      this.context = context;
      _logger = logger;
    }

    // [HttpGet]
    // public IEnumerable<WeatherForecast> Get()
    // {
    //   var rng = new Random();
    //   return Enumerable.Range(1, 5).Select(index => new WeatherForecast
    //   {
    //     Date = DateTime.Now.AddDays(index),
    //     TemperatureC = rng.Next(-20, 55),
    //     Summary = Summaries[rng.Next(Summaries.Length)]
    //   })
    //   .ToArray();
    // }

    [HttpGet]
    public async Task<IActionResult> GetValues()
    {
      List<Value> values = await context.Values.ToListAsync();
      return Ok(values);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetValue(int id)
    {
      Value value = await context.Values.FirstOrDefaultAsync(x => x.Id == id);
      return Ok(value);
    }
  }
}
