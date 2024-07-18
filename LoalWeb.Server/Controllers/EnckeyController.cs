using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace LoalWeb.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EncKeyController : ControllerBase
    {

        private readonly ILogger<EncKeyController> _logger;

        public EncKeyController(ILogger<EncKeyController> logger)
        {
            _logger = logger;
        }



        [HttpGet(Name = "EncKey")]

        public string GET()
        {
            string resp = "Njk1MjAyMC0wNS0wNyAwMzo1OToxMg==";

            byte[] data = Convert.FromBase64String(resp);

            // Convert the byte array to a string using UTF-8 encoding
            string decodedString = Encoding.UTF8.GetString(data);

            return decodedString;

        }

    }
}
