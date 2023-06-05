using backend.Entities;
using backend.Model;

namespace backend.Services
{
    public interface IExerciseService
    {
        Task<List<ExerciseDto>> GetExerciseAsync();

        Task AddExercise(Exercise exercise);
        Task DeleteExercise(int id);
    }
}
