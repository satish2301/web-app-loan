using RestSharp;
using Microsoft.AspNetCore.Http;
using System.Security.Cryptography;
using System.Text;

namespace LoalWeb.Server.Controllers
{
    public class CommonResource
    {


        //public RestRequest CreateRequest(string resource, Method method)
        //{
            
        //    var request = new RestRequest(resource, method);
        //    request.AddHeader("Content-Type", "application/json");
        //    request.AddHeader("UserID", "6397921573");
        //    request.AddHeader("ApiPassword", "satish@123");
        //    request.AddHeader("apikey", "Njk1MjAyMC0wMi0xMSAxMTozNDoyMQ==");
        //    return request;
        //}

        public  string DecryptString(string cipherText)
        {
            string key = "Njk1MjAyMC0wNS0wNyAwMzo1OToxMg==";
            string resp = "";
            byte[] iv = new byte[16];
            byte[] buffer = Convert.FromBase64String(cipherText);

            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key);
                aes.IV = iv;
                ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

                using (MemoryStream memoryStream = new MemoryStream(buffer))
                {
                    using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader streamReader = new StreamReader((Stream)cryptoStream))
                        {
                            resp = streamReader.ReadToEnd();
                            return resp;
                        }
                    }
                }
            }
        }
        public string EncryptString(string plainText)
        {
            string key = "Njk1MjAyMC0wNS0wNyAwMzo1OToxMg==";
            string resp = "";
            byte[] iv = new byte[16];
            byte[] buffer = Convert.FromBase64String(plainText);

            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key);
                aes.IV = iv;
                ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                using (MemoryStream memoryStream = new MemoryStream(buffer))
                {
                    using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, encryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader streamReader = new StreamReader((Stream)cryptoStream))
                        {
                            resp = streamReader.ReadToEnd();
                            return resp;
                        }
                    }
                }
            }
        }

    }
}
