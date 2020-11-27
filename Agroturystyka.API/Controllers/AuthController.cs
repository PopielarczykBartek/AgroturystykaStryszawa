using Agroturystyka.API.Data;
using Agroturystyka.API.Dtos;
using Agroturystyka.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Agroturystyka.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repository;
        public AuthController(IAuthRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
            userForRegisterDto.Email = userForRegisterDto.Email.ToLower();

            if (await _repository.UserExists(userForRegisterDto.Username)) // czy user o takiej nazwie istnieje
                return BadRequest("Uzytkownik o takiej nazwie juz istnieje");

            var userToCreate = new User
            {
                Username = userForRegisterDto.Username,
                Email = userForRegisterDto.Email
            };

            var createdUser = await _repository.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);
        }

    }
}
