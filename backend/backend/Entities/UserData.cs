using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class UserData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public float Weight { get; set; }
        public float Height { get; set; }
        public float TargetWeight { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }


        public ICollection<Workout> Workouts { get; set; }
  = new List<Workout>();
    }
}
