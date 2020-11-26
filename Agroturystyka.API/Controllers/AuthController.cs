using Agroturystyka.API.Data;
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
        public async Task<IActionResult> Register(string username, string password)
        {
            username = username.ToLower();
            if (await _repository.UserExists(username))
                return BadRequest("Uzytkownik o takiej nazwie juz istnieje");

            var userToCreate = new User
            {
                Username = username
            };

            var createdUser = await _repository.Register(userToCreate,password);

            return StatusCode(201);
        }

    }
}
