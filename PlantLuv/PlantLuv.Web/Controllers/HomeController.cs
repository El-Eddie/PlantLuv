using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PlantLuv.Web.Models;

namespace PlantLuv.Web.Controllers
{
	[Route("")]
	public class HomeController : Controller
	{
		private readonly ILogger<HomeController> _logger;

		public HomeController(ILogger<HomeController> logger)
		{
			_logger = logger;
		}

		[Route("")] 
		public IActionResult Index()
		{
			return View();
		}

		[Route("Privacy")]
		public IActionResult Privacy()
		{
			return View();
		}

		//public IActionResult Login()
		//{
		//	return View();
		//} <-- this isn't needed
		
		[Route("Contact")]
		public IActionResult Contact()
		{
			return View();
		}
		//public IActionResult Register()
		//{
		//	return View();
		//}
		[Route("About")]
		public IActionResult About()
		{
			return View();
		}

		[Route("Error")]
		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error()
		{
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}
	}
}
