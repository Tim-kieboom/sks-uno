using Microsoft.AspNetCore.Mvc;
using Uno_api.Controllers.sendArduinoCode;

namespace Uno_api.Controllers
{
    [ApiController]
    [Route("/api")]
    public class FontendController : ControllerBase
    {

        private readonly ILogger<FontendController> _logger;

        public FontendController(ILogger<FontendController> logger)
        {
            _logger = logger;
        }

        [HttpPost("sendArduinoCode")]
        public ActionResult<SendArduinoCodeResponeBody> SendArduinoCode(SendArduinoCodeRequestBody request)
        {
            if (request.Tasks == null)
                return NotFound("Tasks Not Found");

            UnoTranslate translator = new();
            string? code;

            try
            {
                code = translator.Translate(request.Tasks);
            }
            catch (Exception ex)
            {
                return BadRequest(new SendArduinoCodeResponeBody() { Message = ex.Message });
            }

            return Ok(new SendArduinoCodeResponeBody(){Message = code});
        }
    }
}