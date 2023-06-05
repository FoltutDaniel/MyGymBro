using backend.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.Model
{
    public class WorkoutDto
    {
        public int Id { get; set; }

        public string WorkoutDuration { set; get; }

        public DateTime date { get; set; }
        
        public ICollection<WorkoutExerciseDto> ExerciseWorkoutRels { get; set; }
       = new List<WorkoutExerciseDto>();
    }
}
