using backend.Data;
using backend.Entities;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using backend.Services;
using backend.Model;

namespace TestProject1
{
    public class UnitTestWorkoutService
    {

        [Fact]
        public async Task AddWorkout_ExistingUserData_ReturnsAddedWorkoutDto()
        {
            // Arrange
            var userId = 1;
            var workoutDto = new WorkoutDto
            {
                WorkoutDuration = "60",
                date = DateTime.Now
            };

            var userDataMock = new Mock<IUserDataReq>();
            userDataMock.Setup(u => u.GetUserDataByFK(userId))
                        .ReturnsAsync(new UserData
                        {
                            Id = userId,
                            Workouts = new List<Workout>()
                        });

            var workoutDataMock = new Mock<IWorkoutData>();
            workoutDataMock.Setup(w => w.WorkoutDataTest(userId))
                           .ReturnsAsync(new List<Workout>());

            var workoutService = new WorkoutService(
                Mock.Of<IConfiguration>(),
                userDataMock.Object,
                workoutDataMock.Object,
                Mock.Of<IExerciseData>()
            );

            // Act
            var result = await workoutService.AddWorkout(userId, workoutDto);

            // Assert
            Assert.NotNull(result);

        }

        [Fact]
        public async Task AddWorkout_NonExistingUserData_ThrowsException()
        {
            // Arrange
            var userId = 1;
            var workoutDto = new WorkoutDto
            {
                WorkoutDuration = "60",
                date = DateTime.Now
            };

            var userDataMock = new Mock<IUserDataReq>();
            userDataMock.Setup(u => u.GetUserDataByFK(userId))
                        .ReturnsAsync((UserData)null);

            var workoutService = new WorkoutService(
                Mock.Of<IConfiguration>(),
                userDataMock.Object,
                Mock.Of<IWorkoutData>(),
                Mock.Of<IExerciseData>()
            );

            // Act & Assert
            await Assert.ThrowsAsync<Exception>(() => workoutService.AddWorkout(userId, workoutDto));
        }


        [Fact]
        public async Task AddWorkoutExercise_ExistingWorkout_ReturnsAddedWorkoutDto()
        {
            // Arrange
            var workoutId = 1;
            var workoutExerciseDto = new WorkoutExerciseDto
            {
                exercise = new ExerciseDto
                {
                    Id = 1,
                    Name = "Exercise 1",
                    ImageString = "image",
                    Category = "Category 1"
                },
                Weight = 10,
                NumberOfReps = 8,
                NumberOfSets = 3
            };

            var workout = new Workout
            {
                Id = workoutId,
                WorkoutDuration = "60",
                date = DateTime.Now,
                ExerciseWorkoutRels = new List<ExerciseWorkoutRel>()
            };

            var exercise = new Exercise
            {
                Id = workoutExerciseDto.exercise.Id,
                Name = workoutExerciseDto.exercise.Name,
                ImageString = workoutExerciseDto.exercise.ImageString,
                Category = workoutExerciseDto.exercise.Category
            };

            var workoutDataMock = new Mock<IWorkoutData>();
            workoutDataMock.Setup(w => w.WorkoutById(workoutId))
                           .ReturnsAsync(workout);
            workoutDataMock.Setup(w => w.GetByWorkoutId(workoutId))
                           .ReturnsAsync(new List<ExerciseWorkoutRel>());

            var exerciseDataMock = new Mock<IExerciseData>();
            exerciseDataMock.Setup(e => e.GetException(workoutExerciseDto.exercise.Id))
                            .ReturnsAsync(exercise);

            var workoutService = new WorkoutService(
                Mock.Of<IConfiguration>(),
                Mock.Of<IUserDataReq>(),
                workoutDataMock.Object,
                exerciseDataMock.Object
            );

            // Act
            var result = await workoutService.AddWorkoutExercise(workoutId, workoutExerciseDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(workoutId, result.Id);
            Assert.Equal(workout.WorkoutDuration, result.WorkoutDuration);
            Assert.Equal(workout.date, result.date);


        }

        [Fact]
        public async Task AddWorkoutExercise_NonExistingWorkout_ThrowsException()
        {
            // Arrange
            var workoutId = 1;
            var workoutExerciseDto = new WorkoutExerciseDto
            {
                exercise = new ExerciseDto
                {
                    Id = 1,
                    Name = "Exercise 1",
                    ImageString = "image",
                    Category = "Category 1"
                },
                Weight = 10,
                NumberOfReps = 8,
                NumberOfSets = 3
            };

            var workoutDataMock = new Mock<IWorkoutData>();
            workoutDataMock.Setup(w => w.WorkoutById(workoutId))
                           .ReturnsAsync((Workout)null);

            var workoutService = new WorkoutService(
                Mock.Of<IConfiguration>(),
                Mock.Of<IUserDataReq>(),
                workoutDataMock.Object,
                Mock.Of<IExerciseData>()
            );

            // Act & Assert
            await Assert.ThrowsAsync<Exception>(() => workoutService.AddWorkoutExercise(workoutId, workoutExerciseDto));
        }

        [Fact]
        public async Task AddWorkoutExercise_NonExistingExercise_ThrowsException()
        {
            // Arrange
            var workoutId = 1;
            var workoutExerciseDto = new WorkoutExerciseDto
            {
                exercise = new ExerciseDto
                {
                    Id = 1,
                    Name = "Exercise 1",
                    ImageString = "image",
                    Category = "Category 1"
                },
                Weight = 10,
                NumberOfReps = 8,
                NumberOfSets = 3
            };

            var workout = new Workout
            {
                Id = workoutId,
                WorkoutDuration = "60",
                date = DateTime.Now,
                ExerciseWorkoutRels = new List<ExerciseWorkoutRel>()
            };

            var workoutDataMock = new Mock<IWorkoutData>();
            workoutDataMock.Setup(w => w.WorkoutById(workoutId))
                           .ReturnsAsync(workout);

            var exerciseDataMock = new Mock<IExerciseData>();
            exerciseDataMock.Setup(e => e.GetException(workoutExerciseDto.exercise.Id))
                            .ReturnsAsync((Exercise)null);

            var workoutService = new WorkoutService(
                Mock.Of<IConfiguration>(),
                Mock.Of<IUserDataReq>(),
                workoutDataMock.Object,
                exerciseDataMock.Object
            );

            // Act & Assert
            await Assert.ThrowsAsync<Exception>(() => workoutService.AddWorkoutExercise(workoutId, workoutExerciseDto));
        }

        [Fact]
        public async Task GetWorkoutByUserId_ExistingUser_ReturnsWorkoutList()
        {
            // Arrange
            var userId = 1;

            var user = new User
            {
                UserId = userId
            };

            var workouts = new List<Workout>
        {
            new Workout
            {
                Id = 1,
                WorkoutDuration = "60",
                date = DateTime.Now,
                ExerciseWorkoutRels = new List<ExerciseWorkoutRel>()
            },
            new Workout
            {
                Id = 2,
                WorkoutDuration = "45",
                date = DateTime.Now.AddDays(-1),
                ExerciseWorkoutRels = new List<ExerciseWorkoutRel>()
            }
        };

            var exerciseWorkoutRels = new List<ExerciseWorkoutRel>
        {
            new ExerciseWorkoutRel
            {
                Id = 1,
                Exercise = new Exercise
                {
                    Id = 1,
                    Name = "Exercise 1",
                    ImageString = "image",
                    Category = "Category 1"
                },
                Weight = 10,
                NumberOfReps = 8,
                NumberOfSets = 3
            },
            new ExerciseWorkoutRel
            {
                Id = 2,
                Exercise = new Exercise
                {
                    Id = 2,
                    Name = "Exercise 2",
                    ImageString = "image",
                    Category = "Category 2"
                },
                Weight = 15,
                NumberOfReps = 10,
                NumberOfSets = 4
            }
        };

            var userDataMock = new Mock<IUserDataReq>();
            userDataMock.Setup(u => u.GetUserById(userId))
                        .ReturnsAsync(user);

            var workoutDataMock = new Mock<IWorkoutData>();
            workoutDataMock.Setup(w => w.WorkoutDataTest(userId))
                           .ReturnsAsync(workouts);
            workoutDataMock.Setup(w => w.GetByWorkoutId(It.IsAny<int>()))
                           .ReturnsAsync(exerciseWorkoutRels);

            var workoutService = new WorkoutService(
                Mock.Of<IConfiguration>(),
                userDataMock.Object,
                workoutDataMock.Object,
                Mock.Of<IExerciseData>()
            );

            // Act
            var result = await workoutService.GetWorkoutByUserId(userId);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(workouts.Count, result.Count);

            for (int i = 0; i < result.Count; i++)
            {
                var expectedWorkout = workouts[i];
                var actualWorkout = result[i];

                Assert.Equal(expectedWorkout.Id, actualWorkout.Id);
                Assert.Equal(expectedWorkout.WorkoutDuration, actualWorkout.WorkoutDuration);
                Assert.Equal(expectedWorkout.date, actualWorkout.date);
                Assert.NotNull(actualWorkout.ExerciseWorkoutRels);
                Assert.Equal(exerciseWorkoutRels.Count, actualWorkout.ExerciseWorkoutRels.Count);

                for (int j = 0; j < actualWorkout.ExerciseWorkoutRels.Count; j++)
                {
                    var expectedExerciseWorkoutRel = exerciseWorkoutRels[j];
                    var actualExerciseWorkoutRel = actualWorkout.ExerciseWorkoutRels.ElementAt(j);

                    Assert.Equal(expectedExerciseWorkoutRel.Id, actualExerciseWorkoutRel.id);
                    Assert.NotNull(actualExerciseWorkoutRel.exercise);
                    Assert.Equal(expectedExerciseWorkoutRel.Exercise.Id, actualExerciseWorkoutRel.exercise.Id);
                    Assert.Equal(expectedExerciseWorkoutRel.Exercise.Name, actualExerciseWorkoutRel.exercise.Name);
                    Assert.Equal(expectedExerciseWorkoutRel.Exercise.ImageString, actualExerciseWorkoutRel.exercise.ImageString);
                    Assert.Equal(expectedExerciseWorkoutRel.Exercise.Category, actualExerciseWorkoutRel.exercise.Category);
                    Assert.Equal(expectedExerciseWorkoutRel.Weight, actualExerciseWorkoutRel.Weight);
                    Assert.Equal(expectedExerciseWorkoutRel.NumberOfReps, actualExerciseWorkoutRel.NumberOfReps);
                    Assert.Equal(expectedExerciseWorkoutRel.NumberOfSets, actualExerciseWorkoutRel.NumberOfSets);
                }
            }
        }

        [Fact]
        public async Task RemoveWorkoutExercise_ExistingWorkout_ReturnsUpdatedWorkout()
        {
            // Arrange
            var workoutId = 1;
            var workoutExerciseId = 1;

            var workout = new Workout
            {
                Id = workoutId,
                WorkoutDuration = "60",
                date = DateTime.Now,
                ExerciseWorkoutRels = new List<ExerciseWorkoutRel>
            {
                new ExerciseWorkoutRel
                {
                    Id = workoutExerciseId,
                    Exercise = new Exercise
                    {
                        Id = 1,
                        Name = "Exercise 1",
                        ImageString = "image",
                        Category = "Category 1"
                    },
                    Weight = 10,
                    NumberOfReps = 8,
                    NumberOfSets = 3
                },
                new ExerciseWorkoutRel
                {
                    Id = 2,
                    Exercise = new Exercise
                    {
                        Id = 2,
                        Name = "Exercise 2",
                        ImageString = "image",
                        Category = "Category 2"
                    },
                    Weight = 15,
                    NumberOfReps = 10,
                    NumberOfSets = 4
                }
            }
            };

            var exerciseWorkoutRels = new List<ExerciseWorkoutRel>
        {
            new ExerciseWorkoutRel
            {
                Id = 2,
                Exercise = new Exercise
                {
                    Id = 2,
                    Name = "Exercise 2",
                    ImageString = "image",
                    Category = "Category 2"
                },
                Weight = 15,
                NumberOfReps = 10,
                NumberOfSets = 4
            }
        };

            var workoutDataMock = new Mock<IWorkoutData>();
            workoutDataMock.Setup(w => w.WorkoutById(workoutId))
                           .ReturnsAsync(workout);
            workoutDataMock.Setup(w => w.GetByExerciseWorkoutRelId(workoutExerciseId))
                           .ReturnsAsync(workout.ExerciseWorkoutRels.ElementAt(0));
            workoutDataMock.Setup(w => w.GetByWorkoutId(workoutId))
                           .ReturnsAsync(exerciseWorkoutRels);

            var workoutService = new WorkoutService(
                Mock.Of<IConfiguration>(),
                Mock.Of<IUserDataReq>(),
                workoutDataMock.Object,
                Mock.Of<IExerciseData>()
            );

            // Act
            var result = await workoutService.RemoveWorkoutExercise(workoutId, new WorkoutExerciseDto { id = workoutExerciseId });

            // Assert
            Assert.NotNull(result);
            Assert.Equal(workoutId, result.Id);
            Assert.Equal(workout.WorkoutDuration, result.WorkoutDuration);
            Assert.Equal(workout.date, result.date);
            Assert.NotNull(result.ExerciseWorkoutRels);
            Assert.Equal(exerciseWorkoutRels.Count, result.ExerciseWorkoutRels.Count);

            for (int i = 0; i < result.ExerciseWorkoutRels.Count; i++)
            {
                var expectedExerciseWorkoutRel = exerciseWorkoutRels[i];
                var actualExerciseWorkoutRel = result.ExerciseWorkoutRels.ElementAt(i);

                Assert.Equal(expectedExerciseWorkoutRel.Id, actualExerciseWorkoutRel.id);
                Assert.NotNull(actualExerciseWorkoutRel.exercise);
                Assert.Equal(expectedExerciseWorkoutRel.Exercise.Id, actualExerciseWorkoutRel.exercise.Id);
                Assert.Equal(expectedExerciseWorkoutRel.Exercise.Name, actualExerciseWorkoutRel.exercise.Name);
                Assert.Equal(expectedExerciseWorkoutRel.Exercise.ImageString, actualExerciseWorkoutRel.exercise.ImageString);
                Assert.Equal(expectedExerciseWorkoutRel.Exercise.Category, actualExerciseWorkoutRel.exercise.Category);
                Assert.Equal(expectedExerciseWorkoutRel.Weight, actualExerciseWorkoutRel.Weight);
                Assert.Equal(expectedExerciseWorkoutRel.NumberOfReps, actualExerciseWorkoutRel.NumberOfReps);
                Assert.Equal(expectedExerciseWorkoutRel.NumberOfSets, actualExerciseWorkoutRel.NumberOfSets);
            }
        }
    }
}
