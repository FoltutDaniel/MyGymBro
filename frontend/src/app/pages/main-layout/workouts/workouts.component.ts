import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {WorkoutService} from "../../../services/workout.service";
import {Workout} from "../../../model/workout.model";

@Component({
    templateUrl: './workouts.component.html',
    styleUrls: ['./workouts.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class WorkoutsComponent implements OnInit {

    workouts: Workout[];
    workoutDuration;
    visible: boolean;

    constructor(private workoutService: WorkoutService) {
    }

    ngOnInit(): void {
        this.initData();
    }

    private initData() {
        this.workoutService.getAll(Number(sessionStorage.getItem('id'))).then(data => {
            this.workouts = data;
            this.workouts.forEach(workout => {
                let date = new Date(workout.date);
                workout.date = date.toLocaleDateString("en-US") + ' | ' + date.toLocaleTimeString("en-US");
            });
        });
    }

    showDialog(){
        this.visible = true;
    }

    createWorkout() {
        this.visible = false;

        this.workoutService.startWorkout({date: new Date(),workoutDuration: this.workoutDuration}).then(() =>{}).finally(() => this.initData());
    }
}
