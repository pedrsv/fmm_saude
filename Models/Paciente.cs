using System.ComponentModel.DataAnnotations;

namespace ApiPwaBackend.Models
{
    public class Paciente
    {
        public string NomeCompleto { get; set; }

        [Key]
        public string CPF { get; set; }
        public string Email { get; set; }
        public DateTime DataNascimento { get; set; }
        public double Peso { get; set; }
        public double Altura { get; set; }
        public string Ocupacao { get; set; }
        public string Genero { get; set; }
        public bool ConsumoAlcool { get; set; }
        public bool ConsumoTabaco { get; set; }
        public string AntecedenteFamiliar { get; set; }
        public string ComorbidadesPreexistentes { get; set; }
        public string DoencasAnteriores { get; set; }



    }
}
