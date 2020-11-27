using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Agroturystyka.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required(ErrorMessage ="Nazwa użytkownika jest wymgana")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Hasło jest wymgane")]
        [StringLength(12, MinimumLength =6, ErrorMessage ="Hasło musi się składać od 6 do 12 znaków!")]
        public string Password { get; set; }

        [Required(ErrorMessage = "E-mail jest wymagany!")]
        [EmailAddress(ErrorMessage = "Nie porawny adres E-mail!")]
        public string Email { get; set; }
    }
}
