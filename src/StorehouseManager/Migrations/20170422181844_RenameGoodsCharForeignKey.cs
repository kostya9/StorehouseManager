using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace StorehouseManager.Migrations
{
    public partial class RenameGoodsCharForeignKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GoodsCharacteristics_GoodsItems_AreaId",
                table: "GoodsCharacteristics");

            migrationBuilder.DropIndex(
                name: "IX_GoodsCharacteristics_AreaId",
                table: "GoodsCharacteristics");

            migrationBuilder.DropColumn(
                name: "AreaId",
                table: "GoodsCharacteristics");

            migrationBuilder.AddColumn<int>(
                name: "GoodsItemId",
                table: "GoodsCharacteristics",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_GoodsCharacteristics_GoodsItemId",
                table: "GoodsCharacteristics",
                column: "GoodsItemId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_GoodsCharacteristics_GoodsItems_GoodsItemId",
                table: "GoodsCharacteristics",
                column: "GoodsItemId",
                principalTable: "GoodsItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GoodsCharacteristics_GoodsItems_GoodsItemId",
                table: "GoodsCharacteristics");

            migrationBuilder.DropIndex(
                name: "IX_GoodsCharacteristics_GoodsItemId",
                table: "GoodsCharacteristics");

            migrationBuilder.DropColumn(
                name: "GoodsItemId",
                table: "GoodsCharacteristics");

            migrationBuilder.AddColumn<int>(
                name: "AreaId",
                table: "GoodsCharacteristics",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_GoodsCharacteristics_AreaId",
                table: "GoodsCharacteristics",
                column: "AreaId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_GoodsCharacteristics_GoodsItems_AreaId",
                table: "GoodsCharacteristics",
                column: "AreaId",
                principalTable: "GoodsItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
