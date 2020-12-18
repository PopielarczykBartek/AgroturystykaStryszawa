using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Agroturystyka.API.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public DateTime DateAdded { get; set; }
        public string Content { get; set; }
    }
}
