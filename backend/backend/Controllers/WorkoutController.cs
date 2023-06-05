using backend.Data;
using backend.Entities;
using backend.Model;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("workout")]
    [ApiController]
    public class WorkoutController : ControllerBase
    {

        public IConfiguration _configuration;

        public IWorkoutService _workoutService;
        public WorkoutController(IConfiguration config, IWorkoutService workoutService)
        {
            _configuration = config;
            _workoutService = workoutService;
        }

        [Authorize]
        [HttpPost("start-workout/{userId}")]
        public async Task<ActionResult<WorkoutDto>> StartWorkout(int userId, WorkoutDto workoutDto)
        {
            try
            {
                WorkoutDto workouts = await _workoutService.AddWorkout(userId, workoutDto);
                return Ok(workouts);
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }

        }

        [Authorize]
        [HttpPut("add-exercise/{workoutId}")]
        public async Task<ActionResult<WorkoutDto>> AddWorkoutExercise(int workoutId, WorkoutExerciseDto workoutExerciseDto)
        {
            try
            {
                WorkoutDto workouts = await _workoutService.AddWorkoutExercise(workoutId, workoutExerciseDto);
                return Ok(workouts);
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }
        }

        [Authorize]
        [HttpPut("remove-exercise/{workoutId}")]
        public async Task<ActionResult<WorkoutDto>> RemoveWorkoutExercise(int workoutId, WorkoutExerciseDto workoutExerciseDto)
        {

            try
            {
                WorkoutDto workouts = await _workoutService.RemoveWorkoutExercise(workoutId, workoutExerciseDto);
                return Ok(workouts);
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }
        }

        [Authorize]
        [HttpGet("get-all/{userId}")]
        public async Task<ActionResult<List<WorkoutDto>>> GetAll(int userId)
        {

            try
            {
                List<WorkoutDto> workouts = await _workoutService.GetWorkoutByUserId(userId);
                return Ok(workouts);
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }

        }

    }
}
