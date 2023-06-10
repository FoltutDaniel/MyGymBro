using backend.DbContexts;
using backend.Entities;
using backend.Model;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class UserDataReq : IUserDataReq
    {

        private readonly DbInfoContext _dbInfoContext;

        public UserDataReq(DbInfoContext dbInfoContext)
        {
            _dbInfoContext = dbInfoContext ?? throw new ArgumentNullException(nameof(dbInfoContext));
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await _dbInfoContext.Users.ToListAsync();
        }

        public void SingUp(User user)
        {
            _dbInfoContext.Users.Add(user);

            _dbInfoContext.SaveChanges();
        }


        public async Task<User> GetUserByDaneAsync(Model.UserInfo userInfo)
        {
            return await _dbInfoContext.Users.Where(u => u.Email == userInfo.Email).FirstOrDefaultAsync();
        }


        public async Task<User> GetUserByEmail(String email)
        {
            return await _dbInfoContext.Users.Where(_ => _.Email == email).FirstOrDefaultAsync();
        }

        public async Task<User> Login(Model.UserInfo userInfo)
        {
            return await _dbInfoContext.Users.Where(u => u.Email == userInfo.Email).FirstOrDefaultAsync();
        }

        public async Task<User> GetUserById(int id)
        {
            return await _dbInfoContext.Users.Where(u => u.UserId == id).FirstOrDefaultAsync();
        }

        public async Task<UserData> GetUserDataById(int id)
        {
            return await _dbInfoContext.UserDatas.Where(u => u.Id == id).Include(_=> _.User).FirstOrDefaultAsync();
        }

        public async Task<List<UserData>> GetUserDatas()
        {
            return await _dbInfoContext.UserDatas.ToListAsync();
        }

        public void SetUserData(UserData userData)
        {
            _dbInfoContext.UserDatas.Add(userData);
            _dbInfoContext.SaveChanges();
        }

        public async Task<UserData> GetUserDataByFK(int id)
        {
            return await _dbInfoContext.UserDatas.Where(u => u.UserId == id).FirstOrDefaultAsync();
        }

        public void UpdateUserData(UserData userData)
        {
            _dbInfoContext.UserDatas.Update(userData);
            _dbInfoContext.SaveChanges();
        }

        public void updatePassword(User user)
        {
            _dbInfoContext.Users.Update(user);
            _dbInfoContext.SaveChanges(); 
        }
    }
}
