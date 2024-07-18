using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestSharp;
using System.Runtime.ConstrainedExecution;

namespace LoalWeb.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StateNameController : ControllerBase
    {
        private readonly ILogger<StateNameController> _logger;
        CommonResource cmr = new CommonResource();
        public StateNameController(ILogger<StateNameController> logger)
        {
            _logger = logger;
        }
        [HttpPost(Name = "StateName")]
        public string POST([FromBody] string reqData)
        {

            string resp = "";
            string decryptBody = cmr.DecryptString(reqData);
            var fullBody = decryptBody;
            var option = new RestClientOptions("https://reactapi.dialmytrip.com/api/Services/Insurance/Motor/DMTMotorGetState/GetState")
            {
                MaxTimeout = -1,
            };
            var client = new RestClient(option);
            var request = new RestRequest("https://reactapi.dialmytrip.com/api/Services/Insurance/Motor/DMTMotorGetState/GetState", Method.Post);
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
