using Agroturystyka.API.Models;
using Microsoft.EntityFrameworkCore;
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
            var photo = await _context.Photos.Include(x => x.Categories).FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public async Task<List<Photo>> GetPhotos(int IdCategory)
        {
            var photo = await _context.Photos.Include(x => x.Categories).Where(c => c.Categories.Id == IdCategory).ToListAsync();
            return photo;
        }

        public async Task<Category> GetCategory(int idCategory)
        {
            var category = await _context.Categorys.FirstOrDefaultAsync(i => i.Id == idCategory);
            return category;
        }

        public async Task<Photo> GetMainPhotoForHome(int id)
        {
            return await _context.Photos.Where(u => u.Id == id).FirstOrDefaultAsync(p => p.IsMain); // pobierz zdj o id ktore jest IsMain
        }

        public async Task<List<Photo>> GetMainPhotos()
        {
            return await _context.Photos.Where(m => m.IsMain == true).ToListAsync();
        }
    }
}
