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
        public string Sexo { get; set; }
        public string DoencasAnteriores { get; set; }
        public string DoencasAtuais { get; set; }
        public string GrauParentesco { get; set; }
        public string ComorbidadesPreexistentes { get; set; }
        public string ConsumoAlcool { get; set; }
        public string QuantVezesAlcool { get; set; }
        public string ConsumoTabaco { get; set; }
        public string QuantVezesTabaco { get; set; }
        public string PraticaExercicios { get; set; }
        public string QuantVezesExercicios { get; set; }
        public double Peso {  get; set; }
        public double Altura { get; set; }
        public double Sistolica { get; set;}
        public double Diastolica { get; set; }
        public double Imc { get; set; }
        public string ImcClass { get; set; }
        public string ImcRec { get; set; }
        public double Pam { get; set; }
        public string PamClass { get; set; }
        public string PamRec { get; set; }
        public double PossibilidadeHipertencao { get; set; }

    }
}
