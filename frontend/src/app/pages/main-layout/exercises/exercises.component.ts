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
    exercises: Exercise[] = [];
    workouts: any[] = [];
    visible: boolean;

    workoutId;
    exId = null;
    weight = 0;
    sets = 0;
    reps = 0;

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

    showDialog(id) {
        this.visible = true;
        this.exId = id;
    }

    addExercise() {
        if (this.weight === null || this.weight <= 0) {
            this.messageService.add({
                severity: 'error',
                summary: "Error",
                detail: "You need to provide a valid value for weight!"
            });
            return;
        }
        if (this.sets === null || this.sets <= 0) {
            this.messageService.add({
                severity: 'error',
                summary: "Error",
                detail: "You need to provide a valid value for number of sets!"
            });
            return;
        }
        if (this.reps === null || this.reps <= 0) {
            this.messageService.add({
                severity: 'error',
                summary: "Error",
                detail: "You need to provide a valid value for reps!"
            });
            return;
        }
        this.visible = false;
        this.workoutService.addExerciseToWorkout({
            exercise: {id: this.exId},
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
        }).finally(() =>{
            this.exId = null;
            this.weight = 0;
            this.sets = 0;
            this.reps = 0;
        });
    }


}
