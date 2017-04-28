using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace StorehouseManager.Domain.Authentication
{
    public class UserManager
    {
        private readonly EfDbContext _context;

        public static string AuthenticationScheme => "StorehouseManager.Cookies";

        public UserManager(EfDbContext context)
        {
            _context = context;
        }

        public User Register(User user, string password)
        {
            if(string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Password should not be empty", $"{nameof(password).ToLower()}");

            if(string.IsNullOrWhiteSpace(user.UserName))
                throw new ArgumentException("UserName should not be empty", $"{nameof(user.UserName).ToLower()}");

            if(GetUserByUserName(user.UserName) != null)
                throw new ArgumentException("User already exists", $"{nameof(user).ToLower()}");

            user.HashedPassword = HashPassword(password);
            _context.Add(user);
            _context.SaveChanges();
            return user;
        }

        public User GetUser(string userName, string password)
        {
            if (!UserExists(userName))
                return null;
            var hashed = HashPassword(password);
            var user = GetUserByUserName(userName);
            return user.HashedPassword == hashed ? user : null;
        }

        private bool UserExists(string userName)
        {
            return _context.Users.Any(u => u.UserName == userName);
        }

        public ClaimsPrincipal GetPrincipal(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.FirstName + " " + user.SecondName)
            };
            var identity = new ClaimsIdentity(claims, UserManager.AuthenticationScheme);
            return new ClaimsPrincipal(identity);
        }

        private User GetUserByUserName(string userName)
        {
            return _context.Users.SingleOrDefault(user => user.UserName == userName);
        }

        private string HashPassword(string password)
        {
            var md5 = MD5.Create();
            var bytesPassword = Encoding.UTF8.GetBytes(password);
            var hashBytes = md5.ComputeHash(bytesPassword);
            return Encoding.UTF8.GetString(hashBytes);
        }
    }
}

