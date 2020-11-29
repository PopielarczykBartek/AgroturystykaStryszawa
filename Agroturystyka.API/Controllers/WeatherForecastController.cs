using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Agroturystyka.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Agroturystyka.API.Controllers
{
    //http://localhost:8164/weatherforecast
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly DataContext _context;
        public WeatherForecastController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task< IActionResult> GetValues()
        {
            var weather = await _context.WeatherForecasts.ToListAsync();
            return Ok(weather);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetValue(int id)
        {
            var weather = await _context.WeatherForecasts.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(weather);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] WeatherForecast weather)
        {
            _context.WeatherForecasts.Add(weather);
            await _context.SaveChangesAsync();
            return Ok(weather);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] WeatherForecast weather)
        {
            var data = await _context.WeatherForecasts.FindAsync(id);
            data.Summary = weather.Summary;
            data.TemperatureC = weather.TemperatureC;
            _context.WeatherForecasts.Update(data);
            await _context.SaveChangesAsync();
            return Ok(weather);
        }


 
    }
}
