using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestSharp;

namespace LoalWeb.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoanLeadSubmitController : ControllerBase
    {
        private readonly ILogger<LoanLeadSubmitController> _logger;
        CommonResource cmr = new CommonResource();
        public LoanLeadSubmitController(ILogger<LoanLeadSubmitController> logger)
        {
            _logger = logger;
        }
        [HttpPost(Name = "LoanLeadSubmit")]
        public string POST([FromBody] string reqData)
        {

            string resp = "";
            string decryptBody = cmr.DecryptString(reqData);
            var fullBody = decryptBody;
            var option = new RestClientOptions("https://uatreactflight.dialmytrip.com/api/Services/LoanLead")
            {
                MaxTimeout = -1,
            };
            var client = new RestClient(option);
            var request = new RestRequest("https://uatreactflight.dialmytrip.com/api/Services/LoanLead", Method.Post);
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("apikey", "Njk1MjAyMC0wMi0xMSAxMTozNDoyMQ==");

            // Add new key-value pairs as strings
            // Check if 'fullBody' is not an empty object
            //if (fullBody != "{}")
            //{
            //    // Add new key-value pairs as strings with a leading comma
            //    fullBody = fullBody.Insert(fullBody.Length - 1,
            //        $",\"CompanyID\":\"DMT10333\",\"TokenID\":\"Njk1MjAyNC0wMS0wMyAxMTo0NDo1Nw==\"");
            //}
            //else
            //{
            //    // If 'fullBody' is empty, directly replace it with the new key-value pairs
            //    fullBody = "{\"CompanyID\":\"DMT10333\",\"TokenID\":\"Njk1MjAyNC0wMS0wMyAxMTo0NDo1Nw==\"}";
            //}
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
