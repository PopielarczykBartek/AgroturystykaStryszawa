using Agroturystyka.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Agroturystyka.API.Data
{
    public interface IPhotoRepository : IGenericRepository
    {

        Task<Photo> GetPhoto(int id);               // znajdz zdj o konkrentm id
        Task<List<Photo>> GetPhotos(int IdCategory); // znajdz zdjecia po kategorii(id)

    }
}
