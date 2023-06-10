using backend.Entities;

namespace backend.Model
{
    public class WorkoutExerciseDto
    {
        public int id { get; set; }
        public ExerciseDto? exercise { get; set; }

        public float NumberOfSets { get; set; }

        public float NumberOfReps { get; set; }

        public float Weight { get; set; }

    }
}
