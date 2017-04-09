using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using StorehouseManager.Domain.Areas;
using StorehouseManager.Domain.Authentication;

namespace StorehouseManager.Domain
{
    public class EfDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<Area> Rectangles { get; set; }

        public EfDbContext(DbContextOptions<EfDbContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasIndex(user => user.UserName).IsUnique();

            modelBuilder.Entity<Area>().HasOne(a => a.Rectangle).WithOne(r => r.Area)
                .HasForeignKey<Rectangle>(r => r.AreaId);
        }
    }
}
