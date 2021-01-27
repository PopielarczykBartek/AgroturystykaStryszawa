using Agroturystyka.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Agroturystyka.API.Data
{
    public interface IPhotoRepository : IGenericRepository
    {

        Task<Photo> GetPhoto(int id);               // znajdz zdj o konkrentm id
        Task<List<Photo>> GetPhotos(int IdCategory); // znajdz zdjecia po kategorii(id)

        Task<Category> GetCategory(int idCategory);

      //  Task<Photo> SetMainPhotoForHome(int id);    //pobierz zdjecie glowne dla stront Home
        Task<List<Photo>> GetMainPhotos(); //pobranie listy zdjec gdzie isMain = 1.

    }
}
