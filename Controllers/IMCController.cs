using Microsoft.AspNetCore.Mvc;

namespace ApiPwaBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IMCController : ControllerBase
    {
        [HttpPost("calculate")]
        public IActionResult CalculateIMC([FromBody] IMCData data)
        {
            if (data.Height <= 0 || data.Weight <= 0)
            {
                return BadRequest("Altura e peso devem ser valores positivos.");
            }

            double heightInMeters = data.Height / 100.0; // Assegure que a altura esteja em metros.
            double imc = data.Weight / (heightInMeters * heightInMeters);
            var result = ClassifyIMC(imc);

            return Ok(new { IMC = imc, Classification = result.classification, Recommendation = result.recommendation });
        }

        private (string classification, string recommendation) ClassifyIMC(double imc)
        {
            return imc switch
            {
                < 18.5 => ("Baixo peso", "Atenção - Procure um médico para realização de exames que apontem a causa do baixo peso."),
                >= 18.5 and <= 24.9 => ("Peso ideal", "Parabéns - Você está no peso ideal, se alimente bem e faça exercícios."),
                >= 25 and <= 29.9 => ("Sobrepeso", "Atenção - Procure um médico para realizar o tratamento, para reeducação alimentar e exercícios para melhorar sua saúde."),
                >= 30 and <= 34.9 => ("Obesidade grau I", "Atenção - Procure um médico para o tratamento, o tratamento da obesidade vai além da perda de peso."),
                >= 35 and <= 39.9 => ("Obesidade grau II", "Atenção - Procure um médico para o tratamento, o tratamento da obesidade vai além da perda de peso."),
                _ => ("Obesidade grau III", "Atenção - Procure um médico para o tratamento, o tratamento da obesidade vai além da perda de peso.")
            };
        }
    }

    public class IMCData
    {
        public double Weight { get; set; } // peso em kg
        public double Height { get; set; } // altura em cm, ajustar conforme entrada esperada
    }
}
