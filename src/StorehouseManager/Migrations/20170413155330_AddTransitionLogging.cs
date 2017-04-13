using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;
using StorehouseManager.Domain.Goods;

namespace StorehouseManager.Migrations
{
    public partial class AddTransitionLogging : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GoodsTransitions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    From = table.Column<int>(nullable: false),
                    GoodsItemId = table.Column<int>(nullable: false),
                    Note = table.Column<string>(nullable: true),
                    TimeStamp = table.Column<DateTime>(nullable: false),
                    To = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoodsTransitions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GoodsTransitions_GoodsItems_GoodsItemId",
                        column: x => x.GoodsItemId,
                        principalTable: "GoodsItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "GoodsItems",
                nullable: false,
                defaultValue: GoodsItemStatus.Registered);

            migrationBuilder.CreateIndex(
                name: "IX_GoodsTransitions_GoodsItemId",
                table: "GoodsTransitions",
                column: "GoodsItemId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "GoodsItems");

            migrationBuilder.DropTable(
                name: "GoodsTransitions");
        }
    }
}
