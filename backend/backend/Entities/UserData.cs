using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

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
        public int UserId { get; set; }

        [JsonIgnore]
        public virtual User? User { get; set; }


        public ICollection<Workout> Workouts { get; set; }
  = new List<Workout>();
    }
}
