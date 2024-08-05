using fizjobackend.Entities.UserEntities;
using fizjobackend.Interfaces.EmailInterface;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace fizjobackend.Services.EmailService
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task<bool> SendVerificationEmail(string destEmail, string token)
        {
            var emailSettings = _configuration.GetSection("EmailSettings");

            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(emailSettings["FromEmail"]));
            email.To.Add(MailboxAddress.Parse(destEmail));
            email.Subject = "FizjoPanel - Email Verification";

            var resetLink = $"https://localhost:7023/Account/ConfirmEmail?email={Uri.EscapeDataString(destEmail)}&token={Uri.EscapeDataString(token)}";
            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = $@"
                    <h2>Email Verification</h2>
                    <p>Please verify your email by clicking the link below:</p>
                    <a href='{resetLink}'>Verify Email</a>
                    <p>If you did not request this, please ignore this email.</p>"
            };
            email.Body = bodyBuilder.ToMessageBody();

            using var client = new SmtpClient();
            await client.ConnectAsync(emailSettings["SmtpServer"], int.Parse(emailSettings["SmtpPort"]), SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(emailSettings["SmtpUser"], emailSettings["SmtpPass"]);
            await client.SendAsync(email);
            await client.DisconnectAsync(true);
            return true;
        }
    }
}
