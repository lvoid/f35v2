using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DexterCore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransformController : ControllerBase
    {
        private readonly ILogger<TransformController> _logger;

        public TransformController(ILogger<TransformController> logger)
        {
            _logger = logger;
        }

        [HttpGet("GetFiles")]
        public IEnumerable<string> GetFiles()
        {

            IEnumerable<string> files = Directory
                .EnumerateFiles(PATH + "\\Uploads")
                .Select(Path.GetFileName);

            IEnumerable<string> fileNames = files.AsEnumerable();

            return fileNames;
        }


        [HttpGet("GetLastDeploy")]
        public string GetLastDeploy()
        {
            string parentFolder = Directory.GetParent(PATH).FullName;
            DateTime lastWriteTime = Directory.GetLastWriteTime(parentFolder + "\\web-transform");

            return lastWriteTime.ToString();
        }

        [HttpPost("Upload")]
        public string Upload(IFormFile file)
        {
            if (file != null)
            {            
                if (file.Length > 0)
                {
                    var filePath = Path.Combine(PATH + "\\Uploads\\", file.FileName);
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
                process.StartInfo.FileName = PATH + "\\Scripts\\deploy_dexter_conversion.bat";
                process.StartInfo.Arguments = fileName;
                process.StartInfo.WorkingDirectory = PATH + "\\Scripts\\";

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
