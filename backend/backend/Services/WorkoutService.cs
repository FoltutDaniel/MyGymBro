using backend.Data;
using backend.Entities;
using backend.Model;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services
{
    public class WorkoutService : IWorkoutService
    {
        private readonly IUserDataReq _userData;
        private readonly IWorkoutData _workoutData;
        private readonly IExerciseData _exerciseData;
        private readonly IConfiguration _configuration;

        public WorkoutService(IConfiguration configuration, IUserDataReq userData, IWorkoutData workoutData, IExerciseData exerciseData)
        {
            _userData = userData;
            _configuration = configuration;
            _workoutData = workoutData;
            _exerciseData = exerciseData;
        }

        public async Task<WorkoutDto> AddWorkout(int userID, WorkoutDto workoutDto)
        {
            WorkoutDto workout = new WorkoutDto();
            UserData userData = await _userData.GetUserDataByFK(userID);

            if (userData != null)
            {
                userData.Workouts.Add(new Workout()
                {
                    WorkoutDuration = workoutDto.WorkoutDuration,
                    date = workoutDto.date
                });
                _userData.UpdateUserData(userData);
                List<Workout> workouts = await _workoutData.WorkoutDataTest(userData.Id);
                workout.Id = workouts.Last().Id;
                workout.date = workoutDto.date;
                workout.WorkoutDuration = workoutDto.WorkoutDuration;
            }
            else
            {
                throw new Exception("User not exist");
            }


            return workout;
        }

        public async Task<WorkoutDto> AddWorkoutExercise(int workoutId, WorkoutExerciseDto workoutExerciseDto)
        {

            Workout workout = await _workoutData.WorkoutById(workoutId);
            List<WorkoutExerciseDto> workoutExerciseDtos = new List<WorkoutExerciseDto>();
            if (workout != null)
            {
                Exercise exercise = await _exerciseData.GetException(workoutExerciseDto.exercise.Id);

                if (exercise != null)
                {
                    workout.ExerciseWorkoutRels.Add(new ExerciseWorkoutRel()
                    {
                        Weight = workoutExerciseDto.Weight,
                        Exercise = exercise,
                        NumberOfReps = workoutExerciseDto.NumberOfReps,
                        NumberOfSets = workoutExerciseDto.NumberOfSets
                    });
                    _workoutData.UpdateWorkoutById(workout);

                    List<ExerciseWorkoutRel> exerciseWorkoutRels = await _workoutData.GetByWorkoutId(workoutId);
                    for (int i = 0; i < exerciseWorkoutRels.Count; i++)
                    {
                        ExerciseDto exerciseDto = new ExerciseDto();
                        if (exerciseWorkoutRels[i].Exercise != null)
                        {
                            exerciseDto = new ExerciseDto()
                            {
                                Id = exerciseWorkoutRels[i].Exercise.Id,
                                Name = exerciseWorkoutRels[i].Exercise.Name,
                                ImageString = exerciseWorkoutRels[i].Exercise.ImageString,
                                Category = exerciseWorkoutRels[i].Exercise.Category

                            };
                        }

                        workoutExerciseDtos.Add(new WorkoutExerciseDto()
                        {
                            id = exerciseWorkoutRels[i].Id,
                            exercise = exerciseDto,
                            Weight = exerciseWorkoutRels[i].Weight,
                            NumberOfReps = exerciseWorkoutRels[i].NumberOfReps,
                            NumberOfSets = exerciseWorkoutRels[i].NumberOfSets

                        });
                    }
                }
                else
                {
                    throw new Exception("Exercise not exist!!!");
                }
            }
            else
            {
                throw new Exception("Not exist!!!");
            }

            return new WorkoutDto()
            {
                WorkoutDuration = workout.WorkoutDuration,
                Id = workout.Id,
                date = workout.date,
                ExerciseWorkoutRels = workoutExerciseDtos

            };
        }


        public async Task<List<WorkoutDto>> GetWorkoutByUserId(int UserId)
        {
            List<WorkoutDto> workoutList = new List<WorkoutDto>();
            User user = await _userData.GetUserById(UserId);

            if (user != null)
            {
                List<Workout> workouts = await _workoutData.WorkoutDataTest(UserId);

                for (int i = 0; i < workouts.Count; i++)
                {
                    List<WorkoutExerciseDto> workoutExerciseDtos = new List<WorkoutExerciseDto>();
                    List<ExerciseWorkoutRel> exerciseWorkoutRels = await _workoutData.GetByWorkoutId(workouts[i].Id);
                    for (int j = 0; j < exerciseWorkoutRels.Count; j++)
                    {
                     
                        ExerciseDto exerciseDto = new ExerciseDto();
                        if (exerciseWorkoutRels[j].Exercise != null)
                        {
                            exerciseDto = new ExerciseDto()
                            {
                                Id = exerciseWorkoutRels[j].Exercise.Id,
                                Name = exerciseWorkoutRels[j].Exercise.Name,
                                ImageString = exerciseWorkoutRels[j].Exercise.ImageString,
                                Category = exerciseWorkoutRels[j].Exercise.Category

                            };
                        }

                        workoutExerciseDtos.Add(new WorkoutExerciseDto()
                        {
                            id = exerciseWorkoutRels[j].Id,
                            exercise = exerciseDto,
                            Weight = exerciseWorkoutRels[j].Weight,
                            NumberOfReps = exerciseWorkoutRels[j].NumberOfReps,
                            NumberOfSets = exerciseWorkoutRels[j].NumberOfSets

                        });
                    }
                    workoutList.Add(new WorkoutDto
                    {
                        Id = workouts[i].Id,
                        WorkoutDuration = workouts[i].WorkoutDuration,
                        date = workouts[i].date,
                        ExerciseWorkoutRels = workoutExerciseDtos

                    });
                }

            }
            else
            {
                throw new Exception("User not exist");
            }

            return workoutList;

        }

        public async Task<WorkoutDto> RemoveWorkoutExercise(int workoutId, WorkoutExerciseDto workoutExerciseDto)
        {
            Workout workout = await _workoutData.WorkoutById(workoutId);
            List<WorkoutExerciseDto> workoutExerciseDtos = new List<WorkoutExerciseDto>();
            if (workout != null)
            {
                ExerciseWorkoutRel exercise = await _workoutData.GetByExerciseWorkoutRelId(workoutExerciseDto.id);
                if (exercise == null)
                {
                    throw new Exception("ExerciseRel not exist for Id:"+ workoutExerciseDto.id+"!!!");
                }
                _workoutData.RemoveExerciseWorkoutRel(exercise);

                List<ExerciseWorkoutRel> exerciseWorkoutRels = await _workoutData.GetByWorkoutId(workoutId);
                for (int i = 0; i < exerciseWorkoutRels.Count; i++)
                {

                    ExerciseDto exerciseDto = new ExerciseDto();
                    if (exerciseWorkoutRels[i].Exercise != null)
                    {
                        exerciseDto = new ExerciseDto()
                        {
                            Id = exerciseWorkoutRels[i].Exercise.Id,
                            Name = exerciseWorkoutRels[i].Exercise.Name,
                            ImageString = exerciseWorkoutRels[i].Exercise.ImageString,
                            Category = exerciseWorkoutRels[i].Exercise.Category

                        };
                    }
                    workoutExerciseDtos.Add(new WorkoutExerciseDto()
                    {
                        id = exerciseWorkoutRels[i].Id,
                        exercise = exerciseDto,
                        Weight = exerciseWorkoutRels[i].Weight,
                        NumberOfReps = exerciseWorkoutRels[i].NumberOfReps,
                        NumberOfSets = exerciseWorkoutRels[i].NumberOfSets

                    });
                }
            }
            else
            {
                throw new Exception("Not exist!!!");
            }
            return new WorkoutDto()
            {
                WorkoutDuration = workout.WorkoutDuration,
                Id = workout.Id,
                date = workout.date,
                ExerciseWorkoutRels = workoutExerciseDtos

            };
        }
    }
}
