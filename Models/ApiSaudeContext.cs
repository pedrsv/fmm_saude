using Microsoft.EntityFrameworkCore;

namespace ApiPwaBackend.Models
{
    
    public class ApiSaudeContext : DbContext
    {
        public ApiSaudeContext(DbContextOptions<ApiSaudeContext> options) : base(options) {
        }

        public DbSet <Paciente> pacientes {  get; set; }


        string nomeComputador = Environment.MachineName;
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseSqlServer($"Server = {nomeComputador}\\SQLEXPRESS;Database=ApiSaudeBaseDados;Trusted_Connection=True;TrustServerCertificate=True");


    }
}
