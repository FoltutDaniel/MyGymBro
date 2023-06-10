using backend.Data;
using backend.DbContexts;
using backend.Entities;
using backend.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace backend.Services
{
    public class UserService : IUserService
    {
        private readonly IUserDataReq userData;
        private readonly IConfiguration _configuration;

        public UserService(IConfiguration configuration, IUserDataReq userData)
        {
            this.userData = userData;
            _configuration = configuration;
        }

        public async Task<Model.UserInfo> SingIn(UserSingIn userSingIn)
        {
            Model.UserInfo userInfo = null;

            User user = await userData.GetUserByEmail(userSingIn.Email);

            if (user != null)
            {
                if (VerifyPassword(userSingIn.Password, user.Password))
                {
                    userInfo = new Model.UserInfo()
                    {
                        Id = user.UserId,
                        Email = user.Email,
                        User = user.Username,
                        Token = Generate(user)

                    };
                }
                else
                {
                    throw new Exception("Password is wrong");
                }

            }
            else
            {
                throw new Exception("This email not exist!!!");
            }


            return userInfo;

        }

        public void SingOut() { }
        public async Task SingUp(UserSingUp userSingUp)
        {

            User userEmail = await userData.GetUserByEmail(userSingUp.Email);
            if (userEmail == null)
            {

                User user = new User()
                {
                    Username = userSingUp.UserName,
                    Password = HashPassword(userSingUp.Password),
                    Email = userSingUp.Email,
                    UserData = new UserData()
                    {
                        Weight = 0,
                        Height = 0,
                        TargetWeight = 0,
                    }
                };

                userData.SingUp(user);
            }
            else
            {
                throw new Exception("Email exist");
            }

        }

        public async Task<List<User>> GetUsersAsync()
        {
            List<User> users = userData.GetAllUsers().Result;


            return users;
        }

        private string Generate(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
            };

            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
              _configuration["Jwt:Audience"],
              claims,
              expires: DateTime.Now.AddMinutes(15),
              signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public void DeactivateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(token);
            jwtToken.Payload.Clear();

            tokenHandler.TokenLifetimeInMinutes = 0;

        }

        public static string HashPassword(string password)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));

                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }

        public static bool VerifyPassword(string enteredPassword, string storedHash)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] enteredBytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(enteredPassword));

                StringBuilder enteredBuilder = new StringBuilder();
                for (int i = 0; i < enteredBytes.Length; i++)
                {
                    enteredBuilder.Append(enteredBytes[i].ToString("x2"));
                }
                string enteredHash = enteredBuilder.ToString();

                return enteredHash.Equals(storedHash);
            }
        }

        public async Task<UserDataDto> GetUserDataById(int id)
        {
            User user = await userData.GetUserById(id);
            UserData userDataReq = await userData.GetUserDataByFK(id);
            UserDataDto userD = new UserDataDto();

            if (user != null)
            {
                if (userDataReq != null)
                {
                    userD = new UserDataDto()
                    {
                        Id = userDataReq.Id,
                        User = new UserDto()
                        {
                            Id = user.UserId,
                            UserName = user.Username,
                            Email = user.Email,
                        },
                        Weight = userDataReq.Weight,
                        Height = userDataReq.Height,
                    };
                }
                else
                {
                    userD = new UserDataDto()
                    {
                        Id = 0,
                        User = new UserDto()
                        {
                            Id = user.UserId,
                            UserName = user.Username,
                            Email = user.Email,
                        },
                        Weight = 1,
                        Height = 0,
                    };
                }
            }
            else
            {
                throw new Exception("User not exist");
            }

            return userD;
        }

        public async Task<UserDataDto> PostUserData(UserDataDto userDataDto)
        {
            UserData userD = await userData.GetUserDataById(userDataDto.Id);

            if (userD != null)
            {

                userD.Id = userDataDto.Id;
                userD.Weight = userDataDto.Weight;
                userD.Height = userDataDto.Height;
                userD.TargetWeight = userDataDto.TargetWeight;

                userData.UpdateUserData(userD);
            }
            else
            {
                throw new Exception("UserData not exist!!");
            }
            return new UserDataDto()
            {
                User = new UserDto()
                {
                    UserName = userD.User.Username,
                    Id = userD.User.UserId,
                    Email = userD.User.Email
                },
                Weight = userD.Weight,
                Height = userD.Height,
                TargetWeight = userD.TargetWeight,
                Id = userDataDto.Id
            };
        }

        public Task<List<UserData>> GetUserDatas()
        {
            return userData.GetUserDatas();
        }

        public async Task<UserDto> ChangePassword(UserDto user)
        {
            User userD = await userData.GetUserByEmail(user.Email);

            if (userD != null)
            {
                userD.Password = HashPassword(user.Password);
                userData.updatePassword(userD);
            }
            else
            {
                throw new Exception("User not exist!!");
            }


            return user;

        }
    }
}
