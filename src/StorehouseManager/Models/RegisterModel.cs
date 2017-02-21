using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StorehouseManager.Domain;
using StorehouseManager.Domain.Authentication;

namespace StorehouseManager.Models
{
    public class RegisterModel
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string Password { get; set; }

        public User GenerateUser()
        {
            return new User()
            {
                FirstName = FirstName,
                UserName = UserName,
                HashedPassword = null,
                SecondName = SecondName,
            };
        }
    }
}
