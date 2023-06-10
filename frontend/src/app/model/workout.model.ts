import {WorkoutExercise} from "./workout-exercise.model";

export class Workout{
    id: number;
    workoutDuration: number;
    date: string;
    exerciseWorkoutRels: WorkoutExercise[];
}
