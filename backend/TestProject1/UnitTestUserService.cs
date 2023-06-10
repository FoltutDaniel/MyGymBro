using backend.Data;
using backend.Entities;
using backend.Model;
using backend.Services;
using Microsoft.Extensions.Configuration;
using Moq;
using System.Security.Cryptography;
using System.Text;

namespace TestProject1
{
    public class UnitTestUserService
    {
        [Fact]
        public  async void SignUp_ValidUser_SuccessfullyRegistersUser()
        {
            var userSingUp = new UserSingUp
            {
                UserName = "testuser",
                Password = "password",
                Email = "test@example.com"
            };

            var configurationMock = new Mock<IConfiguration>();
            var userDataMock = new Mock<IUserDataReq>();

            configurationMock.Setup(c => c["Jwt"]).Returns("{\r\n    \"Key\": \"Yh2k7QSu4l8CZg5p6X3Pna9L0Miy4D3Bvt0JVr87UcOj69Kqw5R2Nmf4FWs03Hdx\",\r\n    \"Issuer\": \"JWTAuthenticationServer\",\r\n    \"Audience\": \"JWTServicePostmanClient\",\r\n    \"Subject\": \"JWTServiceAccessToken\"\r\n  }");
            userDataMock.Setup(u => u.GetUserByEmail(userSingUp.Email))
                        .ReturnsAsync((User)null);

            var signUpService = new UserService(configurationMock.Object, userDataMock.Object);

            // Act
             await signUpService.SingUp(userSingUp);

            // Assert
            userDataMock.Verify(u => u.SingUp(It.IsAny<User>()), Times.Once);
        }

        [Fact]
        public async void SignUp_ExistingEmail_ThrowsException()
        {
            var userSingUp = new UserSingUp
            {
                UserName = "testuser",
                Password = "password",
                Email = "test@example.com"
            };

            var configurationMock = new Mock<IConfiguration>();
            var userDataMock = new Mock<IUserDataReq>();
            var existingUser = new User
            {
                UserId = 1,
                Email = "test@example.com",
                Username = "existinguser"
            };
            userDataMock.Setup(u => u.GetUserByEmail(userSingUp.Email))
                        .ReturnsAsync(existingUser);

            var signUpService = new UserService(configurationMock.Object, userDataMock.Object);

            // Act & Assert
            await Assert.ThrowsAsync<Exception>(() => signUpService.SingUp(userSingUp));
        }


        [Fact]
        public async Task GetUserDataById_ExistingUserWithUserData_ReturnsUserDataDto()
        {
            // Arrange
            var userId = 1;
            var configurationMock = new Mock<IConfiguration>();
            var userDataMock = new Mock<IUserDataReq>();
            userDataMock.Setup(u => u.GetUserById(userId))
                        .ReturnsAsync(new User
                        {
                            UserId = userId,
                            Username = "testuser",
                            Email = "test@example.com"
                        });

            userDataMock.Setup(u => u.GetUserDataByFK(userId))
                        .ReturnsAsync(new UserData
                        {
                            Id = 1,
                            Weight = 70,
                            Height = 180
                        });

            var getUserDataService = new UserService(configurationMock.Object, userDataMock.Object);

            // Act
            var result = await getUserDataService.GetUserDataById(userId);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(1, result.Id);
            Assert.NotNull(result.User);
            Assert.Equal(userId, result.User.Id);
            Assert.Equal("testuser", result.User.UserName);
            Assert.Equal("test@example.com", result.User.Email);
            Assert.Equal(70, result.Weight);
            Assert.Equal(180, result.Height);
        }


        [Fact]
        public async Task GetUserDataById_ExistingUserWithoutUserData_ReturnsUserDataDtoWithDefaultValues()
        {
            // Arrange
            var userId = 1;
            var configurationMock = new Mock<IConfiguration>();
            var userDataMock = new Mock<IUserDataReq>();
            userDataMock.Setup(u => u.GetUserById(userId))
                        .ReturnsAsync(new User
                        {
                            UserId = userId,
                            Username = "testuser",
                            Email = "test@example.com"
                        });

            userDataMock.Setup(u => u.GetUserDataByFK(userId))
                        .ReturnsAsync((UserData)null);

            var getUserDataService = new UserService(configurationMock.Object, userDataMock.Object);

            // Act
            var result = await getUserDataService.GetUserDataById(userId);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(0, result.Id);
            Assert.NotNull(result.User);
            Assert.Equal(userId, result.User.Id);
            Assert.Equal("testuser", result.User.UserName);
            Assert.Equal("test@example.com", result.User.Email);
            Assert.Equal(1, result.Weight); // Default weight value
            Assert.Equal(0, result.Height); // Default height value
        }

        [Fact]
        public async Task GetUserDataById_NonExistingUser_ThrowsException()
        {
            // Arrange
            var userId = 1;
            var configurationMock = new Mock<IConfiguration>();
            var userDataMock = new Mock<IUserDataReq>();
            userDataMock.Setup(u => u.GetUserById(userId))
                        .ReturnsAsync((User)null);

            var getUserDataService = new UserService(configurationMock.Object, userDataMock.Object);

            // Act & Assert
            await Assert.ThrowsAsync<Exception>(() => getUserDataService.GetUserDataById(userId));
        }

        [Fact]
        public async Task PostUserData_ExistingUserData_ReturnsUpdatedUserDataDto()
        {
            var configurationMock = new Mock<IConfiguration>();
            // Arrange
            var userDataDto = new UserDataDto
            {
                Id = 1,
                Weight = 70,
                Height = 180,
                TargetWeight = 65,
                User = new UserDto
                {
                    Id = 1,
                    UserName = "testuser",
                    Email = "test@example.com"
                }
            };

            var userDataMock = new Mock<IUserDataReq>();
            userDataMock.Setup(u => u.GetUserDataById(userDataDto.Id))
                        .ReturnsAsync(new UserData
                        {
                            Id = userDataDto.Id,
                            Weight = 80,
                            Height = 190,
                            TargetWeight = 70,
                            User = new User
                            {
                                UserId = userDataDto.User.Id,
                                Username = userDataDto.User.UserName,
                                Email = userDataDto.User.Email
                            }
                        });

            var postUserDataService = new UserService(configurationMock.Object, userDataMock.Object);

            // Act
            var result = await postUserDataService.PostUserData(userDataDto);

            // Assert
            Assert.NotNull(result);
            Assert.NotNull(result.User);
            Assert.Equal(1, result.User.Id);
            Assert.Equal("testuser", result.User.UserName);
            Assert.Equal("test@example.com", result.User.Email);
            Assert.Equal(70, result.Weight);
            Assert.Equal(180, result.Height);
            Assert.Equal(65, result.TargetWeight);
            Assert.Equal(1, result.Id);
        }

        [Fact]
        public async Task PostUserData_NonExistingUserData_ThrowsException()
        {
            var configurationMock = new Mock<IConfiguration>();
            // Arrange
            var userDataDto = new UserDataDto
            {
                Id = 1,
                Weight = 70,
                Height = 180,
                TargetWeight = 65,
                User = new UserDto
                {
                    Id = 1,
                    UserName = "testuser",
                    Email = "test@example.com"
                }
            };

            var userDataMock = new Mock<IUserDataReq>();
            userDataMock.Setup(u => u.GetUserDataById(userDataDto.Id))
                        .ReturnsAsync((UserData)null);

            var postUserDataService = new UserService(configurationMock.Object, userDataMock.Object);

            // Act & Assert
            await Assert.ThrowsAsync<Exception>(() => postUserDataService.PostUserData(userDataDto));
        }

        [Fact]
        public async Task ChangePassword_ExistingUser_ReturnsUpdatedUserDto()
        {
            var configurationMock = new Mock<IConfiguration>();
            // Arrange
            var userDto = new UserDto
            {
                Email = "test@example.com",
                Password = "newpassword"
            };

            var userDataMock = new Mock<IUserDataReq>();
            userDataMock.Setup(u => u.GetUserByEmail(userDto.Email))
                        .ReturnsAsync(new User
                        {
                            UserId = 1,
                            Username = "testuser",
                            Email = "test@example.com",
                            Password = "oldpassword"
                        });

            var changePasswordService = new UserService(configurationMock.Object, userDataMock.Object);

            // Act
            var result = await changePasswordService.ChangePassword(userDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(userDto.Email, result.Email);
            Assert.Equal(userDto.Password, result.Password);
        }

        [Fact]
        public async Task ChangePassword_NonExistingUser_ThrowsException()
        {
            var configurationMock = new Mock<IConfiguration>();
            // Arrange
            var userDto = new UserDto
            {
                Email = "test@example.com",
                Password = "newpassword"
            };

            var userDataMock = new Mock<IUserDataReq>();
            userDataMock.Setup(u => u.GetUserByEmail(userDto.Email))
                        .ReturnsAsync((User)null);

            var changePasswordService = new UserService(configurationMock.Object, userDataMock.Object);

            // Act & Assert
            await Assert.ThrowsAsync<Exception>(() => changePasswordService.ChangePassword(userDto));
        }

    }
}