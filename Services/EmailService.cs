using MimeKit.Text;
using MimeKit;
using static System.Net.Mime.MediaTypeNames;
using MailKit.Security;
using MailKit.Net.Smtp;
using ApiPwaBackend.Models;

namespace ApiPwaBackend.Services
{
public class EmailService
    {

        public async Task CreateBody(Paciente body)
        {
            var htmlBody = CreateHtmlBody(body);
            await SendEmailAsync("victor.victorhugo.hugo4@gmail.com", "Segue seu Resultado do SaúdeFMM", htmlBody);
        }


        public string CreateHtmlBody(Paciente paciente)
        {
            return $@"
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                }}
                .container {{
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }}
                h2 {{
                    text-align: center;
                }}
                .info {{
                    margin-bottom: 5px;
                }}
                .info span {{
                    font-weight: bold;
                }}
            </style>
        </head>
        <body>
            <div class='container'>
                <h2>Olá {paciente.NomeCompleto}, Segue seu Resultado do SaúdeFMM</h2>
                <div class='info'>
                    <h3>Ficha Cadastral</h3>
                    <p><span>Nome:</span> {paciente.NomeCompleto}</p>
                    <p><span>Data Nascimento:</span> {paciente.DataNascimento}</p>
                    <p><span>Doenças Atuais:</span> {paciente.DoencasAtuais}</p>
                    <p><span>Doenças Anteriores:</span> {paciente.DoencasAnteriores}</p>
                    <p><span>Grau de Parentesco:</span> {paciente.GrauParentesco}</p>
                    <p><span>Cormobidades:</span> {paciente.ComorbidadesPreexistentes}</p>
                    <p><span>Consumo de Alcool:</span> {paciente.ConsumoAlcool}</p>
                    <p><span>Quantas vezes consome Alcool:</span> {paciente.QuantVezesAlcool}</p>
                    <p><span>Consumo de Tabaco:</span> {paciente.ConsumoTabaco}</p>
                    <p><span>Quantas vezes consome Tabaco: </span> {paciente.QuantVezesTabaco}</p>
                    <p><span>Pratica Exercicios:</span> {paciente.PraticaExercicios}</p>
                    <p><span>Quantas vezes Praticas Exercicios:</span> {paciente.QuantVezesExercicios}</p>
                    <h3>Ficha Médica</h3>
                    <p><span>IMC:</span> {paciente.Imc}</p>
                    <p>{paciente.ImcClass}</p>
                    <p>{paciente.ImcRec}</p>
                    <p><span>Pressão:</span> {paciente.Pam}</p>
                    <p>{paciente.PamClass}</p>
                    <p>{paciente.PamRec}</p>
                    <h3>Resultado Hipotético</h3>
                    <p>A probabilidade de você ter Hipertensão é de : {paciente.PossibilidadeHipertencao}</p>
                </div>
            </div>
        </body>
        </html>
    ";
        }




        public async Task SendEmailAsync(string to, string novo, string htmlBody)
        {
            var email = new MimeMessage();

            email.From.Add(MailboxAddress.Parse("MS_rVYT5z@trial-k68zxl2enymlj905.mlsender.net"));
            email.To.Add(MailboxAddress.Parse(to));
            email.Subject = novo;
            email.Body = new TextPart(TextFormat.Html) { Text = htmlBody };

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync("smtp.mailersend.net", 587, SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync("MS_rVYT5z@trial-k68zxl2enymlj905.mlsender.net", "D37vUSerOAxApqQ1");
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }

      }
}
