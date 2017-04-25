using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using StorehouseManager.Domain;
using StorehouseManager.Domain.Authentication;

namespace StorehouseManager
{
    // PATTERN: Proxy
    public sealed class UserProxy : User
    {
        private readonly EfDbContext _context;
        private User _dbUser;
        private User DbUser => _dbUser ?? (_dbUser = _context.Users.First(u => u.Id == Id));

        public UserProxy(IHttpContextAccessor accessor, EfDbContext context)
        {
            _context = context;
            var idString = accessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            Id = int.Parse(idString);
        }

        public override string FirstName
        {
            get { return DbUser.FirstName; }
            set { DbUser.FirstName = value; }
        }

        public override string HashedPassword
        {
            get { return DbUser.HashedPassword;  }
            set { DbUser.HashedPassword = value;  }
        }

        public override string UserName
        {
            get { return DbUser.UserName;  }
            set { DbUser.FirstName = value;  }
        }

        public override string SecondName
        {
            get { return DbUser.SecondName;  }
            set { DbUser.SecondName = value;  }
        }
    }
}
