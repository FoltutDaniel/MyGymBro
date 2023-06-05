using backend.Entities;
using backend.Model;

namespace backend.Services
{
    public interface IUserService
    {
        public Task<UserDto> ChangePassword(UserDto user);

        public Task<UserDataDto> GetUserDataById(int id);
   
        public Task<UserDataDto> PostUserData(UserDataDto userDataDto);

        public Task SingUp(UserSingUp userSingUp);
        public Task<List<User>> GetUsersAsync();
        public Task<Model.UserInfo> SingIn(UserSingIn userSingIn);
        public void DeactivateToken(string token);
        public Task<List<UserData>> GetUserDatas();
    }
}
