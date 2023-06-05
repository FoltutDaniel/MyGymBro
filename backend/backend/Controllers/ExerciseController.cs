using backend.Entities;
using backend.Model;
using backend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("exercise")]
    [ApiController]

    public class ExerciseController : ControllerBase
    {

        public IConfiguration _configuration;

        public IExerciseService _exerciseService;
        public ExerciseController(IConfiguration config, IExerciseService exerciseService)
        {
            _configuration = config;
            _exerciseService = exerciseService;
        }

        [HttpGet("getAll")]
        public async Task<ActionResult<List<ExerciseDto>>> getAll()
        {
            try
            {
                List<ExerciseDto> exercises = await _exerciseService.GetExerciseAsync();
                return Ok(exercises);
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }

        }


        [HttpPost]
        public async Task<ActionResult<String>> Add(Exercise exercise)
        {
            try
            {
                await _exerciseService.AddExercise(exercise);
                return Ok("Ok");
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }

        }


        [HttpDelete]
        public async Task<ActionResult<String>> Delete(int id)
        {
            try
            {
                await _exerciseService.DeleteExercise(id);
                return Ok("Ok");
            }
            catch (Exception ex)
            {
                return BadRequest($"{ex.Message}");
            }

        }
    }
}
