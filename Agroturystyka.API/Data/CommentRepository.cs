using Agroturystyka.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Agroturystyka.API.Data
{
    public class CommentRepository : GenericRepository, ICommentRepository
    {
        private readonly DataContext _context;

        public CommentRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<Comment>> GetComments()
        {
            var comment = await _context.Comments.ToListAsync();
            return comment;
        }

        public async Task<Comment> GetComment(int id)
        {
            var comment = await _context.Comments.FirstOrDefaultAsync(x => x.Id == id);
            return comment;
        }

    }
}
