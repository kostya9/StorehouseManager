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

        public EfDbContext(DbContextOptions<EfDbContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasIndex(user => user.UserName).IsUnique();

            modelBuilder.Entity<Area>().Property<int>("rectangleId").IsRequired();
            modelBuilder.Entity<Rectangle>().Property<int>("areaId").IsRequired();
            modelBuilder.Entity<Rectangle>().Property<int>("rectangleId").IsRequired();

            modelBuilder.Entity<Area>()
                .HasOne(area => area.Rectangle)
                .WithOne()
                .IsRequired()
                // use shadow property, which only exists in the database, but not on the Address model
                .HasForeignKey(typeof(Rectangle), "areaId")
                .HasPrincipalKey(typeof(Area), "rectangleId");
        }
    }
}
