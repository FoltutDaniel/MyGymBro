using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class Workout
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string WorkoutDuration { set; get; }

        [Column(TypeName = "Date")]
        public DateTime date { get; set; }

        [ForeignKey("UserDataId")]
        public UserData? UserData { get; set; }

        public ICollection<ExerciseWorkoutRel> ExerciseWorkoutRels { get; set; }
       = new List<ExerciseWorkoutRel>();
    }
}
