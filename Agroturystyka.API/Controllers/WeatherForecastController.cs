using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Agroturystyka.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Agroturystyka.API.Controllers
{
    //http://localhost:8164/weatherforecast

    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly DataContext _context;
        public WeatherForecastController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetValues()
        {
            var weather = _context.WeatherForecasts.ToList();
            return Ok(weather);
        }

        [HttpGet("{id}")]
        public IActionResult GetValue(int id)
        {
            var weather = _context.WeatherForecasts.FirstOrDefault(x => x.Id == id);
            return Ok(weather);
        }

        [HttpPost]
        public IActionResult Post([FromBody] WeatherForecast weather)
        {
            _context.WeatherForecasts.Add(weather);
            _context.SaveChanges();
            return Ok(weather);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] WeatherForecast weather)
        {
            var data = _context.WeatherForecasts.Find(id);
            data.Summary = weather.Summary;
            data.TemperatureC = weather.TemperatureC;
            _context.WeatherForecasts.Update(data);
            _context.SaveChanges();
            return Ok(weather);
        }


 
    }
}
