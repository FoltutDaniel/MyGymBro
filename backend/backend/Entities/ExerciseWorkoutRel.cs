using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class ExerciseWorkoutRel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public float NumberOfSets { get; set; }

        public float NumberOfReps { get; set; }

        public float Weight { get; set; }

        [ForeignKey("ExerciseId")]
        public Exercise? Exercise { get; set; }

        [ForeignKey("WorkoutId")]
        public Workout? Workout { get; set; }
    }
}
