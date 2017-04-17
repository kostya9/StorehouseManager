using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using StorehouseManager.Domain;
using StorehouseManager.Domain.Areas;
using StorehouseManager.Domain.Goods;

namespace StorehouseManager.Migrations
{
    [DbContext(typeof(EfDbContext))]
    [Migration("20170416212855_LastTransition")]
    partial class LastTransition
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("StorehouseManager.Domain.Areas.Area", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<int>("Type");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.ToTable("Area");
                });

            modelBuilder.Entity("StorehouseManager.Domain.Areas.Rectangle", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AreaId");

                    b.Property<double>("Height");

                    b.Property<double>("Width");

                    b.Property<double>("X");

                    b.Property<double>("Y");

                    b.HasKey("Id");

                    b.HasIndex("AreaId")
                        .IsUnique();

                    b.ToTable("Rectangle");
                });

            modelBuilder.Entity("StorehouseManager.Domain.Authentication.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("FirstName");

                    b.Property<string>("HashedPassword");

                    b.Property<string>("SecondName");

                    b.Property<string>("UserName");

                    b.HasKey("Id");

                    b.HasIndex("UserName")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("StorehouseManager.Domain.Goods.GoodsItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("AreaId");

                    b.Property<DateTime>("LastTransition");

                    b.Property<string>("Name");

                    b.Property<int>("Status");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("AreaId");

                    b.ToTable("GoodsItems");
                });

            modelBuilder.Entity("StorehouseManager.Domain.Goods.TransitionLogs.GoodsTransition", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("From");

                    b.Property<int>("GoodsItemId");

                    b.Property<string>("Note");

                    b.Property<DateTime>("TimeStamp");

                    b.Property<int>("To");

                    b.HasKey("Id");

                    b.HasIndex("GoodsItemId");

                    b.ToTable("GoodsTransitions");
                });

            modelBuilder.Entity("StorehouseManager.Domain.Areas.Rectangle", b =>
                {
                    b.HasOne("StorehouseManager.Domain.Areas.Area", "Area")
                        .WithOne("Rectangle")
                        .HasForeignKey("StorehouseManager.Domain.Areas.Rectangle", "AreaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("StorehouseManager.Domain.Goods.GoodsItem", b =>
                {
                    b.HasOne("StorehouseManager.Domain.Areas.Area", "Area")
                        .WithMany("Items")
                        .HasForeignKey("AreaId");
                });

            modelBuilder.Entity("StorehouseManager.Domain.Goods.TransitionLogs.GoodsTransition", b =>
                {
                    b.HasOne("StorehouseManager.Domain.Goods.GoodsItem", "GoodsItem")
                        .WithMany("Transitions")
                        .HasForeignKey("GoodsItemId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
