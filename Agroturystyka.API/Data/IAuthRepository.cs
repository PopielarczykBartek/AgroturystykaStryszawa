﻿using Agroturystyka.API.Models;
using System.Threading.Tasks;

namespace Agroturystyka.API.Data
{
    public interface IAuthRepository
    {
        Task<User> Login(string username, string password);
        Task<User> Register(User user, string password);
        Task<bool> UserExists(string username);
    }
}
