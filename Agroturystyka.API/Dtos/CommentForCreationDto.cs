using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Agroturystyka.API.Dtos
{
    public class CommentForCreationDto
    {
        public string NickName { get; set; }
        public string Email { get; set; }
        public DateTime DateAdded { get; set; }
        public string Content { get; set; }

        public CommentForCreationDto()
        {
            DateAdded = DateTime.Now;
        }
    }

   
    
}
