using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiPwaBackend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "pacientes",
                columns: table => new
                {
                    CPF = table.Column<string>(type: "nvarchar(9)", nullable: false),
                    NomeCompleto = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DataNascimento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Peso = table.Column<double>(type: "float", nullable: false),
                    Altura = table.Column<double>(type: "float", nullable: false),
                    Ocupacao = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Genero = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ConsumoAlcool = table.Column<bool>(type: "bit", nullable: false),
                    ConsumoTabaco = table.Column<bool>(type: "bit", nullable: false),
                    AntecedenteFamiliar = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ComorbidadesPreexistentes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DoencasAnteriores = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pacientes", x => x.CPF);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "pacientes");
        }
    }
}
