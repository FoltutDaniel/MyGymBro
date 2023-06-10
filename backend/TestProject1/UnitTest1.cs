using backend.Data;
using backend.Entities;
using backend.Model;
using backend.Services;
using Microsoft.Extensions.Configuration;
using Moq;

namespace TestProject1
{
    public class UnitTest1
    {


        public Mock<IUserService> _userService;
        public UnitTest1()
        {
            this._userService = new Mock<IUserService>();


        }

        [Fact]
        public void Test1()
        {
            string email = "test@example.com";
            string password = "password";
            UserSingIn userSingIn = new UserSingIn()
            {

                Email = email,
                Password = password
            };
            UserInfo user = new UserInfo
            {
                Id = 1,
                Email = email,
                User = "testuser",
                Token = ""
            };

            this._userService.Setup(x =>x.SingIn(userSingIn)).ReturnsAsync(user);


            Assert.NotNull(user);

        }


        [Fact]
        public void GetAllTest()
        {
        }
    }
}