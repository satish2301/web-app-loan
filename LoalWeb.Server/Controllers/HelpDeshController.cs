using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestSharp;
using System.Runtime.ConstrainedExecution;

namespace LoalWeb.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HelpDeshController : ControllerBase
    {
        CommonResource cmr = new CommonResource();
        private readonly ILogger<HelpDeshController> logger;

        public HelpDeshController(ILogger<HelpDeshController> logger)
        {
            this.logger = logger;
        }

        [HttpPost(Name = "HelpDesh")]

        public string POST([FromBody] string reqData)
        {
            string resp = "";
            string decryptBody = cmr.DecryptString(reqData);
            var fullBody = decryptBody;

            var option = new RestClientOptions("https://api.dialmytrip.com/api/Services/DMTHelpdesk")
            {
                MaxTimeout = -1,
            };
            var client = new RestClient(option);

            var request = new RestRequest("https://api.dialmytrip.com/api/Services/DMTHelpdesk", Method.Post);
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("apikey", "Njk1MjAyMC0wMi0xMSAxMTozNDoyMQ==");

            request.AddBody(fullBody);
            RestResponse response = client.Execute(request);
            if (response.Content != null)
            {
                resp = (response.Content);
            }
            else
            {
                resp = "data not available";

            };
            return resp;
        }
    }
}
