using Agroturystyka.API.Data;
using Agroturystyka.API.Dtos;
using Agroturystyka.API.Helpers;
using Agroturystyka.API.Models;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Agroturystyka.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly IPhotoRepository _photoRepository;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public PhotosController(IUserRepository repository,IPhotoRepository photoRepository ,IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repository = repository;
            _photoRepository = photoRepository;

            Account account = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
                );

            _cloudinary = new Cloudinary(account);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId,int idCategory, [FromForm]PhotoForCreationDto photoForCreationDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repository.GetUser(userId);

            var file = photoForCreationDto.File;
            var uploadResult = new ImageUploadResult();

            if(file.Length > 0)
            {
                using(var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500)
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoForCreationDto.Url = uploadResult.Url.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;
            photoForCreationDto.Description = "";

            var photo = _mapper.Map<Photo>(photoForCreationDto);

            // zabezpieczenie jak user ma photo = null
            if(userFromRepo.Photos == null)
            {
                userFromRepo.Photos = new List<Photo>();
            }

            photo.Categories = await _photoRepository.GetCategory(idCategory);

            userFromRepo.Photos.Add(photo);

            if(await _repository.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                
                return CreatedAtRoute("GetPhoto", new { id = photo.Id}, photoToReturn);
            }
            return BadRequest("Nie udało się dodać zdjęcia");

        }


        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _photoRepository.GetPhoto(id);

            var photoForReturn = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photoForReturn);

        }

        [AllowAnonymous]
        [HttpGet("getPhotos")]
        public async Task<List<Photo>> GetPhotos(int IdCategory)
        {
            var x = await _photoRepository.GetPhotos(IdCategory);
            return x;
        }

        [HttpPost("SetMainPhoto")]
        public async Task<IActionResult> SetMainPhoto(int userId, int id)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repository.GetUser(userId);

            if (!user.Photos.Any(p => p.Id == id))
                return Unauthorized();

            var photoFromRepo = await _photoRepository.GetPhoto(id);

            if (photoFromRepo.IsMain)
                return BadRequest("To zdjecie jest ustawione na zdjeciach głównych");

            photoFromRepo.IsMain = true;
            if (await _photoRepository.SaveAll())
                return NoContent();

            return BadRequest("Nie mozna ustawic zdjecia jako glownego");
        }

        [AllowAnonymous]
        [HttpGet("GetMainPhotos")]
        public async Task<List<Photo>> GetMainPhotos()
        {
            return await _photoRepository.GetMainPhotos();
        }

        [HttpDelete("DeletePhoto")]
        public async Task<IActionResult> DeletePhoto(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repository.GetUser(userId);

            if (!user.Photos.Any(p => p.Id == id))
                return Unauthorized();

            var photoFromRepo = await _photoRepository.GetPhoto(id);

            //if (photoFromRepo.IsMain)
            // return BadRequest("To zdjecie jest ustawione na zdjeciach głównych");

            if(photoFromRepo.public_id != null)
            {
                var deleteParams = new DeletionParams(photoFromRepo.public_id);
                var result = _cloudinary.Destroy(deleteParams);

                if (result.Result == "ok")
                    _repository.Delete(photoFromRepo);
            }
            else
            {
                _repository.Delete(photoFromRepo);
            }
      
            if (await _repository.SaveAll())
                return Ok();
            return BadRequest("Nie udało się usunąć zdjęcia");
        }
    }
}