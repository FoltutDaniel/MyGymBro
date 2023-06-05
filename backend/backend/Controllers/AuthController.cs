using backend.Entities;
using backend.Model;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Helper;

namespace backend.Controllers
{

    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        public IConfiguration _configuration;

        public IUserService _userService;
        public AuthController(IConfiguration config, IUserService userService)
        {
            _configuration = config;
            _userService = userService;
        }

        [Authorize]
        [HttpGet("GetAllUser")]
        public ActionResult<List<User>> GetAllUser()
        {
            return Ok(_userService.GetUsersAsync());
        }

        [HttpPost("register")]
        public async Task<ActionResult> SingUp(UserSingUp userSingUp)
        {
            try
            {
                await _userService.SingUp(userSingUp);
                return Ok("User Create");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult> SingIn(UserSingIn userSingIn)
        {
            try
            {
                Model.UserInfo userInfo = await _userService.SingIn(userSingIn);
                return Ok(userInfo);
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }

        }

        [HttpPost("logout")]
        public async Task<ActionResult> logout()
        {
            try
            {
                string authorizationHeader = Request.Headers["Authorization"];
                if (!string.IsNullOrEmpty(authorizationHeader) && authorizationHeader.StartsWith("Bearer "))
                {

                    string token = authorizationHeader.Substring("Bearer ".Length).Trim();
                    TokenManager.RevokeToken(token);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }

        }






    }
}
