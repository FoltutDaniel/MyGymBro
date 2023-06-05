using backend.Entities;

namespace backend.Model
{
    public class UserDataDto
    {
        public int Id { get; set; }
        public UserDto? User { get; set; }
        public float Weight { get; set; }
        public float Height { get; set; }
        public float TargetWeight { get; set; }

    }
}
