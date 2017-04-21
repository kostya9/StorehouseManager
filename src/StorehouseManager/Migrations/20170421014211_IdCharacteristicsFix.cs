using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace StorehouseManager.Migrations
{
    public partial class IdCharacteristicsFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AreaCharacteristics_Area_AreaId1",
                table: "AreaCharacteristics");

            migrationBuilder.DropIndex(
                name: "IX_AreaCharacteristics_AreaId1",
                table: "AreaCharacteristics");

            migrationBuilder.DropColumn(
                name: "AreaId1",
                table: "AreaCharacteristics");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AreaId1",
                table: "AreaCharacteristics",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AreaCharacteristics_AreaId1",
                table: "AreaCharacteristics",
                column: "AreaId1",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AreaCharacteristics_Area_AreaId1",
                table: "AreaCharacteristics",
                column: "AreaId1",
                principalTable: "Area",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
