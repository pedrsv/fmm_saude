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
                    CPF = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    NomeCompleto = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DataNascimento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Sexo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DoencasAnteriores = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DoencasAtuais = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GrauParentesco = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ComorbidadesPreexistentes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ConsumoAlcool = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    QuantVezesAlcool = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ConsumoTabaco = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    QuantVezesTabaco = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PraticaExercicios = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    QuantVezesExercicios = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Peso = table.Column<double>(type: "float", nullable: false),
                    Altura = table.Column<double>(type: "float", nullable: false),
                    Sistolica = table.Column<double>(type: "float", nullable: false),
                    Diastolica = table.Column<double>(type: "float", nullable: false),
                    Imc = table.Column<double>(type: "float", nullable: false),
                    ImcClass = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImcRec = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pam = table.Column<double>(type: "float", nullable: false),
                    PamClass = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PamRec = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PossibilidadeHipertencao = table.Column<double>(type: "float", nullable: false)
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
