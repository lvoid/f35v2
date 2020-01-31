using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DexterCore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DeployController : ControllerBase
    {
        private readonly ILogger<DeployController> _logger;

        public DeployController(ILogger<DeployController> logger)
        {
            _logger = logger;
        }

        [HttpGet("GetFiles")]
        public IEnumerable<string> GetFiles()
        {
            var files = Directory
                .EnumerateFiles("C:\\Projects\\DexterCore\\Uploads")
                .Select(Path.GetFileName);

            IEnumerable<string> fileNames = files.AsEnumerable();

            return fileNames;
        }

        [HttpPost("UploadTransform")]
        public string UploadTransform(IFormFile file)
        {
            if (file != null)
            {
                var uploads = "C:\\Projects\\DexterCore\\Uploads";
            
                if (file.Length > 0)
                {
                    var filePath = Path.Combine(uploads, file.FileName);
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        file.CopyToAsync(fileStream);
                    }
                }
            }
            return "Uploaded Transformation";
        }

        [HttpPost("DeployTransform")]
        public string DeployTransform([FromForm] string fileName)
        {
            try
            {
                Process process = new Process();

                // redirect the output stream of the child process.
                process.StartInfo.UseShellExecute = false;
                process.StartInfo.RedirectStandardOutput = true;
                process.StartInfo.CreateNoWindow = true;
                process.StartInfo.FileName = "C:\\Projects\\DexterCore/Scripts\\deploy_dexter_conversion.bat";
                process.StartInfo.Arguments = fileName;
                process.StartInfo.WorkingDirectory = "C:\\Projects\\DexterCore/Scripts\\";

                process.Start();
                string output = null;
                output = process.StandardOutput.ReadToEnd();
                process.WaitForExit();
                process.Dispose();
                return output;
            }
            catch(Exception ex)
            {
                return "Exception occurred" + ex;
            }
        }
    }
}
