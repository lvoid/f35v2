using System.IO;
using Microsoft.AspNetCore.Mvc;

namespace DexterCore.Controllers
{

    public class ControllerBase : Controller
    {
        public string PATH;

        public ControllerBase()
        {
            PATH = Directory.GetCurrentDirectory();
        }
    }
}
