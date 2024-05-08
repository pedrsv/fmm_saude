using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using MimeKit.Text;
using System.Net.Mail;

namespace ApiPwaBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        [HttpPost]

        public IActionResult SendEmail(string body)
        {

            var email = new MimeMessage();

            email.From.Add(MailboxAddress.Parse("MS_IcUgJB@fmm.pedrsv.com"));
            email.To.Add(MailboxAddress.Parse("victor.victorhugo.hugo4@gmail.com"));
            email.Subject = "Teste";
            email.Body = new TextPart(TextFormat.Html) { Text = body };

            using var smtp = new MailKit.Net.Smtp.SmtpClient();
            smtp.Connect("smtp.mailersend.net", 587, SecureSocketOptions.StartTls);
            smtp.Authenticate("MS_IcUgJB@fmm.pedrsv.com", "ufG9Ti4Dbe6PlTvV");
            smtp.Send(email);
            smtp.Disconnect(true);
            return Ok();



        }


    }
}



