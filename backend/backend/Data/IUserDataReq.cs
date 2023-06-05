using backend.Entities;
using backend.Model;

namespace backend.Data
{
    public interface IUserDataReq
    {
        Task<List<User>> GetAllUsers();
        void SetUserData(UserData userData);
        void UpdateUserData(UserData userData);

        void updatePassword(User user);
        public Task<UserData> GetUserDataByFK(int id);
        Task<User> GetUserByDaneAsync(Model.UserInfo userInfo);
        Task<User> GetUserByEmail(String email);
        Task<User> GetUserById(int id);

        Task<UserData> GetUserDataById(int id);

        Task<List<UserData>> GetUserDatas();

        void SingUp(User user);

    }
}
