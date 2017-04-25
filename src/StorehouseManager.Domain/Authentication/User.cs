using System;

namespace StorehouseManager.Domain.Authentication
{
    public class User
    {
        public virtual int Id { get; set; }
        public virtual string UserName { get; set; }
        public virtual string FirstName { get; set; }
        public virtual string SecondName { get; set; }
        public virtual string HashedPassword { get; set; }
    }
}
