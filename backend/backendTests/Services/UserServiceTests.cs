using Microsoft.VisualStudio.TestTools.UnitTesting;
using backend.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using backend.Model;
using Microsoft.Extensions.Configuration;

namespace backend.Services.Tests
{
    [TestClass]
    public class UserServiceTests
    {

        public IConfiguration _configuration;

        public IUserService _userService;
        public UserServiceTests(IConfiguration config, IUserService userService)
        {
            _configuration = config;
            _userService = userService;
        }


        [Fact]
        public async void SingInTest()
        {

            UserSingIn userSingIn = new UserSingIn()
            {
                Email = "test22222222@test.com",
                Password = "password",
            };

            UserInfo userInfo = await _userService.SingIn(userSingIn);

            Assert.IsNotNull(userInfo);


        }
    }
}