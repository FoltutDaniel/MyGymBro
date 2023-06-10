using backend.Data;
using backend.Entities;
using backend.Services;
using Microsoft.Extensions.Configuration;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestProject1
{
    public class UnitTestException
    {
        [Fact]
        public async Task GetExerciseAsync_ReturnsListOfExerciseDto()
        {
            // Arrange
            var exercise1 = new Exercise
            {
                Id = 1,
                Name = "Exercise 1",
                ImageString = "image",
                Category = "Category 1"
            };

            var exercise2 = new Exercise
            {
                Id = 2,
                Name = "Exercise 2",
                ImageString = "image",
                Category = "Category 2"
            };

            var exerciseDataMock = new Mock<IExerciseData>();
            exerciseDataMock.Setup(e => e.GetExerciseAsync())
                            .ReturnsAsync(new List<Exercise> { exercise1, exercise2 });

            var exerciseService = new ExerciseService(
                Mock.Of<IConfiguration>(),
                Mock.Of<IUserDataReq>(),
                exerciseDataMock.Object
            );

            // Act
            var result = await exerciseService.GetExerciseAsync();

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Count);

            var exerciseDto1 = result[0];
            Assert.Equal(exercise1.Id, exerciseDto1.Id);
            Assert.Equal(exercise1.Name, exerciseDto1.Name);
            Assert.Equal(exercise1.ImageString, exerciseDto1.ImageString);
            Assert.Equal(exercise1.Category, exerciseDto1.Category);

            var exerciseDto2 = result[1];
            Assert.Equal(exercise2.Id, exerciseDto2.Id);
            Assert.Equal(exercise2.Name, exerciseDto2.Name);
            Assert.Equal(exercise2.ImageString, exerciseDto2.ImageString);
            Assert.Equal(exercise2.Category, exerciseDto2.Category);
        }
        [Fact]
        public async Task AddExercise_CallsAddExerciseOnExerciseData()
        {
            // Arrange
            var exerciseDataMock = new Mock<IExerciseData>();

            var exerciseService = new ExerciseService(
                Mock.Of<IConfiguration>(),
                Mock.Of<IUserDataReq>(),
                exerciseDataMock.Object
            );

            var exercise = new Exercise
            {
                Id = 1,
                Name = "Exercise 1",
                ImageString = "image",
                Category = "Category 1"
            };

            // Act
            await exerciseService.AddExercise(exercise);

            // Assert
            exerciseDataMock.Verify(e => e.AddExercise(exercise), Times.Once);
        }

        [Fact]
        public async Task DeleteExercise_CallsDeleteExerciseOnExerciseData()
        {
            // Arrange
            var exerciseDataMock = new Mock<IExerciseData>();

            var exerciseService = new ExerciseService(
                Mock.Of<IConfiguration>(),
                Mock.Of<IUserDataReq>(),
                exerciseDataMock.Object
            );

            var exerciseId = 1;

            // Act
            await exerciseService.DeleteExercise(exerciseId);

            // Assert
            exerciseDataMock.Verify(e => e.DeleteExercise(exerciseId), Times.Once);
        }
    }
}
