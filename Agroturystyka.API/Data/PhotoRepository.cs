using Agroturystyka.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Agroturystyka.API.Data
{
    public class PhotoRepository : GenericRepository, IPhotoRepository
    {
        private readonly DataContext _context;

        public PhotoRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public async Task<List<Photo>> GetPhotos(int IdCategory)
        {
            var photo = await _context.Photos.Include(x => x.Categories).Where(c => c.Categories.Id == IdCategory).ToListAsync();
            
            return photo;
        }

    }
}
