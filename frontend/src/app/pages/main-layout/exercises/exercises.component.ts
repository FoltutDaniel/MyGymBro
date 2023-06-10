import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ExerciseService} from "../../../services/exercise.service";
import {Exercise} from "../../../model/exercise.model";
import {WorkoutService} from "../../../services/workout.service";


@Component({
    templateUrl: './exercises.component.html',
    styleUrls: ['./exercises.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ExercisesComponent implements OnInit {
    exercises: Exercise[];
    workouts: any[] = [];
    visible: boolean;

    workoutId;
    weight;
    sets;
    reps;

    constructor(private exercisesService: ExerciseService, private workoutService: WorkoutService) {
    }

    ngOnInit(): void {
        this.workoutService.getAll(Number(sessionStorage.getItem('id'))).then(data => {
            data.forEach(workout => this.workouts.push({
                label: new Date(workout.date).toLocaleDateString("en-US") + ' | ' + new Date(workout.date).toLocaleTimeString("en-US"),
                value: workout.id
            }));
        });
        this.exercisesService.getAllExercises().subscribe(data => {
            this.exercises = data;
            this.exercises = this.exercises.filter(exercise => exercise.name !== 'Test');
        })
    }

    showDialog() {
        this.visible = true;
    }

    addExercise(exerciseId) {
        this.visible = false;
        this.workoutService.addExerciseToWorkout({
            exercise: {id: exerciseId},
            numberOfSets: this.sets,
            numberOfReps: this.reps,
            weight: this.weight
        }, this.workoutId).subscribe(data => console.log(data));
    }

//"exercise": {
//     "id": 1,
//     "category": "string",
//     "name": "string",
//     "imageString": "string"
//   },
//   "numberOfSets": 0,
//   "numberOfReps": 0,
//   "weight": 0

}
