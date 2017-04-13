using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace StorehouseManager.Migrations
{
    public partial class NullableAreaIdForGoods : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GoodsItems_Area_AreaId",
                table: "GoodsItems");

            migrationBuilder.AlterColumn<int>(
                name: "AreaId",
                table: "GoodsItems",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_GoodsItems_Area_AreaId",
                table: "GoodsItems",
                column: "AreaId",
                principalTable: "Area",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GoodsItems_Area_AreaId",
                table: "GoodsItems");

            migrationBuilder.AlterColumn<int>(
                name: "AreaId",
                table: "GoodsItems",
                nullable: false);

            migrationBuilder.AddForeignKey(
                name: "FK_GoodsItems_Area_AreaId",
                table: "GoodsItems",
                column: "AreaId",
                principalTable: "Area",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
