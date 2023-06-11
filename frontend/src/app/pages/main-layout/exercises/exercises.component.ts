import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ExerciseService} from "../../../services/exercise.service";
import {Exercise} from "../../../model/exercise.model";
import {WorkoutService} from "../../../services/workout.service";
import {MessageService} from "primeng/api";


@Component({
    templateUrl: './exercises.component.html',
    styleUrls: ['./exercises.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService]
})
export class ExercisesComponent implements OnInit {
    exercises: Exercise[];
    workouts: any[] = [];
    visible: boolean;

    workoutId;
    weight;
    sets;
    reps;

    constructor(private exercisesService: ExerciseService, private workoutService: WorkoutService, private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.workoutService.getAll(Number(sessionStorage.getItem('id'))).then(data => {
            data = data.sort((a,b) =>
                Date.parse(b.date) - Date.parse(a.date));
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
        }, this.workoutId).then(data => {
            this.messageService.add({severity: 'success', summary: "Success", detail: "Exercise was added to the workout"});
        }).catch(() => {
            this.messageService.add({
                severity: 'error',
                summary: "Error",
                detail: "There was a problem with adding the exercise to the workout!"
            });
        });
    }


}
