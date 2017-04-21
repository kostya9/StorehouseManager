using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace StorehouseManager.Migrations
{
    public partial class AddAreaCharacteristics : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AreaCharacteristics",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AreaId = table.Column<int>(nullable: false),
                    AreaId1 = table.Column<int>(nullable: true),
                    Humidity = table.Column<double>(nullable: false),
                    Temperature = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AreaCharacteristics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AreaCharacteristics_Area_AreaId",
                        column: x => x.AreaId,
                        principalTable: "Area",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AreaCharacteristics_Area_AreaId1",
                        column: x => x.AreaId1,
                        principalTable: "Area",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AreaCharacteristics_AreaId",
                table: "AreaCharacteristics",
                column: "AreaId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AreaCharacteristics_AreaId1",
                table: "AreaCharacteristics",
                column: "AreaId1",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AreaCharacteristics");
        }
    }
}
