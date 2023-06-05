using backend.Entities;
using backend.Model;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services
{
    public interface IWorkoutService
    {

        public Task<WorkoutDto> AddWorkout(int userID, WorkoutDto workoutDto);

        public Task<List<WorkoutDto>> GetWorkoutByUserId(int UserId);
        public Task<WorkoutDto> AddWorkoutExercise(int workoutId, WorkoutExerciseDto workoutExerciseDto);
        public Task<WorkoutDto> RemoveWorkoutExercise(int workoutId, WorkoutExerciseDto workoutExerciseDto);
    }

}
