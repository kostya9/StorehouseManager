using System;

namespace StorehouseManager.Domain.Authentication
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string HashedPassword { get; set; }
    }
}
