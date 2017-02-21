using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using StorehouseManager.Domain.Authentication;

namespace StorehouseManager.Domain
{
    public class EfDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public EfDbContext(DbContextOptions<EfDbContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasIndex(user => user.UserName).IsUnique();
        }
    }
}
