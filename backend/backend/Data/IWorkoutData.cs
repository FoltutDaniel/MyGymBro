using backend.Entities;

namespace backend.Data
{
    public interface IWorkoutData
    {


        Task<List<Workout>> WorkoutDataTest(int UserId);

        Task<Workout> WorkoutById(int Id);
        void RemoveExerciseWorkoutRel(ExerciseWorkoutRel exercise);

        Task<List<ExerciseWorkoutRel>> GetByWorkoutId(int Id);

        Task<ExerciseWorkoutRel> GetByWorkoutOneId(int Id);

        Task UpdateWorkoutById(Workout workout);

        public Task<ExerciseWorkoutRel> GetByExerciseWorkoutRelId(int Id);


        public Task<Exercise> GetExerciseExerciseWorkoutRelId(int Id);
    }
}
