﻿using System;

namespace Agroturystyka.API.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; } // Opis
        public DateTime DateAdded { get; set; } // Data dodania
        public bool IsMain { get; set; }        // Czy zdjecie jest głowne
    }
}