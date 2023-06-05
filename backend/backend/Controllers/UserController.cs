using backend.Entities;
using backend.Model;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace backend.Controllers
{
    [Route("user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public IConfiguration _configuration;

        public IUserService _userService;
        public UserController(IConfiguration config, IUserService userService)
        {
            _configuration = config;
            _userService = userService;
        }
        [Authorize]
        [HttpGet("user-data")]
        public async Task<ActionResult<UserDataDto>> GetUserDataAsync(int id)
        {
            try
            {
                UserDataDto userDataDto = await _userService.GetUserDataById(id);
                return Ok(userDataDto);
            }
            catch (Exception ex)
            {
                    if (ex.Message == "Token invalid!!!")
                {
                    return Unauthorized();
                }
                else
                {
                    if (ex.Message == "Token invalid!!!")
                    {
                        return Unauthorized();
                    }
                    else
                    {
                        return BadRequest($"{ex.Message}");
                    }
                }
            }
        }

        [Authorize]
        [HttpPost("user-data")]
        public async Task<ActionResult<UserDataDto>> PostUserData(UserDataDto userDataDto)
        {
            try
            {
                UserDataDto userDataDtoNew = await _userService.PostUserData(userDataDto);
                return Ok(userDataDtoNew);
            }
            catch (Exception ex)
            {
                if (ex.Message == "Token invalid!!!")
                {
                    return Unauthorized();
                }
                else
                {
                    return BadRequest($"{ex.Message}");
                }
            }
        }

        [HttpPost("change-password")]
        public async Task<ActionResult> ChangePassword(UserDto user)
        {
            try
            {
                await _userService.ChangePassword(user);
                return Ok("Password is change!!");
            }
            catch (Exception ex)
            {
                if (ex.Message == "Token invalid!!!")
                {
                    return Unauthorized();
                }
                else
                {
                    return BadRequest($"{ex.Message}");
                }
            }
        }

    }
}
