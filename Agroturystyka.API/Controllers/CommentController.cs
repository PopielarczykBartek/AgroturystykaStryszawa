using Agroturystyka.API.Data;
using Agroturystyka.API.Dtos;
using Agroturystyka.API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Agroturystyka.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : Controller
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public CommentController(ICommentRepository commentRepository, IUserRepository userRepository, IMapper mapper)
        {
            _commentRepository = commentRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }


        [HttpPost("AddComment")]
        public async Task<IActionResult> AddComment(CommentForCreationDto commentForCreationDto)
        {
            if (commentForCreationDto.NickName == null)
                return BadRequest("Nie wprowadzono Nicku");

            var content = commentForCreationDto.Content;

            if(content.Length > 0)
            {
                var comment = _mapper.Map<Comment>(commentForCreationDto);
                 
                _commentRepository.Add(comment);
            }
            else
            {
                return BadRequest("Nie wprowadzono zawartosci wiadomości");
            }

            if (await _commentRepository.SaveAll())
                return Ok();

            return BadRequest("cos poszło nie tak...");

        }

        [HttpGet("getComments")]
        public async Task<List<Comment>> GetComments()
        {
            var x = await _commentRepository.GetComments();
            return x;
        }

        [Authorize]
        [HttpDelete("DeleteComment")]
        public async Task<IActionResult> DeleteComment(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _userRepository.GetUser(userId);

            var commentForRepo = await _commentRepository.GetComment(id);

            if (commentForRepo != null)
                _commentRepository.Delete(commentForRepo);
            else
                return BadRequest("Nie ma zdjecia o podanym Id");

            if (await _commentRepository.SaveAll())
                return Ok();
            return BadRequest("Nie udało się usunąć komentarza");
        }


    }
}