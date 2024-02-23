using MailKit.Security;
using MimeKit.Text;
using MimeKit;
using MailKit.Net.Smtp;

namespace SimpleEmailApp.Services.EmailService
{
    
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;
        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public IConfiguration Config { get; }

        public void SendEmail(EmailDto request)
        {
            Console.WriteLine("Hello");
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_config.GetSection("EmailUserName").Value));
            email.To.Add(MailboxAddress.Parse(request.To));
            email.Subject = (request.Flag=="1")? "Password reset":"Registration Successfull";
            var temp = (request.Flag == "1") ? $"Dear User, <br><br><p>Your password has been changed. <br> your new password is: {request.Password}.</p><br><br>Regards,<br>Nisha." 
                :$"Dear {request.Name}, <br><br><p>Welcome! Thank you for registration.</p><br><br>Regards,<br>Nisha.";
            email.Body = new TextPart(TextFormat.Html) { Text = temp };

            using var smtp = new SmtpClient();
            smtp.Connect(_config.GetSection("EmailHost").Value, 587, SecureSocketOptions.StartTls);
            smtp.Authenticate(_config.GetSection("EmailUserName").Value, _config.GetSection("EmailPassword").Value);
            smtp.Send(email);
            smtp.Disconnect(true);
        }
    }
}
