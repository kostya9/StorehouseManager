using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using StorehouseManager.Domain.Areas;
using StorehouseManager.Domain.Authentication;
using StorehouseManager.Domain.Goods;
using StorehouseManager.Domain.Goods.TransitionLogs;

namespace StorehouseManager.Domain
{
    public class EfDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<Area> Rectangles { get; set; }
        public DbSet<GoodsItem> GoodsItems { get; set; }
        public DbSet<GoodsTransition> GoodsTransitions { get; set; }
        public DbSet<AreaCharacteristics> AreaCharacteristics { get; set; }

        public EfDbContext(DbContextOptions<EfDbContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasIndex(user => user.UserName).IsUnique();

            modelBuilder.Entity<Area>().HasOne(a => a.Rectangle).WithOne(r => r.Area)
                .HasForeignKey<Rectangle>(r => r.AreaId);

            modelBuilder.Entity<GoodsItem>().HasOne(gi => gi.Area).WithMany(a => a.Items)
                .HasForeignKey(gi => gi.AreaId);

            modelBuilder.Entity<GoodsItem>().Ignore(gi => gi.TransitionState);

            modelBuilder.Entity<GoodsTransition>().HasOne(gt => gt.GoodsItem).WithMany(gi => gi.Transitions)
                .HasForeignKey(gt => gt.GoodsItemId);

            modelBuilder.Entity<Area>().HasOne(a => a.Characteristics).WithOne(c => c.Area)
                .HasForeignKey<AreaCharacteristics>(a => a.AreaId);

            modelBuilder.Entity<AreaCharacteristics>().Property(ac => ac.Volume)
                .HasAnnotation("SqlDefaultValue", Domain.Areas.AreaCharacteristics.DefaultVolume);

            modelBuilder.Entity<GoodsItem>().HasOne(gi => gi.Characteristics).WithOne(c => c.Area)
                .HasForeignKey<GoodsCharacteristics>(c => c.AreaId);
        }
    }
}
