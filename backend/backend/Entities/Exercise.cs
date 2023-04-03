using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class Exercise
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Category { get; set; }

        public string Name { get; set; }

        public string ImageString { get; set; }

        public ICollection<ExerciseWorkoutRel> ExerciseWorkoutRels { get; set; }
         = new List<ExerciseWorkoutRel>();
    }
}
