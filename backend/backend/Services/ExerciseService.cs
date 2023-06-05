using backend.Data;
using backend.Entities;
using backend.Model;

namespace backend.Services
{
    public class ExerciseService : IExerciseService
    {
        private readonly IUserDataReq _userData;
        private readonly IExerciseData _exerciseData;
        private readonly IConfiguration _configuration;

        public ExerciseService(IConfiguration configuration, IUserDataReq userData, IExerciseData exerciseData)
        {
            _userData = userData;
            _configuration = configuration;
            _exerciseData = exerciseData;
        }
        public async Task AddExercise(Exercise exercise)
        {
            await _exerciseData.AddExercise(exercise);
        }

        public async Task DeleteExercise(int id)
        {
            await _exerciseData.DeleteExercise(id);
        }

        public async Task<List<ExerciseDto>> GetExerciseAsync()
        {
            List<Exercise> exercises = await _exerciseData.GetExerciseAsync();
            List<ExerciseDto> result = new List<ExerciseDto>(); ;

            for (int i = 0; i < exercises.Count; i++)
            {
                result.Add(new ExerciseDto()
                {
                    Id = exercises[i].Id,
                    Category = exercises[i].Category,
                    ImageString = exercises[i].ImageString,
                    Name = exercises[i].Name,
                });
            }



            return result;
        }
    }
}
