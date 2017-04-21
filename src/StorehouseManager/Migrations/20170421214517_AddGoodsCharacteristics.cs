using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace StorehouseManager.Migrations
{
    public partial class AddGoodsCharacteristics : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GoodsCharacteristics",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AreaId = table.Column<int>(nullable: false),
                    HumidityHigh = table.Column<double>(nullable: false),
                    HumidityLow = table.Column<double>(nullable: false),
                    TemperatureHigh = table.Column<double>(nullable: false),
                    TemperatureLow = table.Column<double>(nullable: false),
                    Volume = table.Column<double>(nullable: false, defaultValue: 0.001)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GoodsCharacteristics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GoodsCharacteristics_GoodsItems_AreaId",
                        column: x => x.AreaId,
                        principalTable: "GoodsItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GoodsCharacteristics_AreaId",
                table: "GoodsCharacteristics",
                column: "AreaId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GoodsCharacteristics");
        }
    }
}
