using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Agroturystyka.API.Dtos
{
    public class PhotoForReturnDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; } // opis
        public DateTime DateAdded { get; set; } //data dodania
        public bool IsMain { get; set; }        // czy zdj jest główne
        public string Public_Id { get; set; }
    }
}
