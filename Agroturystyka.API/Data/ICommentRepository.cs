using Agroturystyka.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Agroturystyka.API.Data
{
    public interface ICommentRepository : IGenericRepository
    {
        Task<Comment> GetComment(int id);
        Task<List<Comment>> GetComments(); // pobierz wszystkie komentarze

    }
}
