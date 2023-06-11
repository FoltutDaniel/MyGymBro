import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {WorkoutService} from "../../../services/workout.service";
import {Workout} from "../../../model/workout.model";
import {MessageService} from "primeng/api";

@Component({
    templateUrl: './workouts.component.html',
    styleUrls: ['./workouts.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService]
})
export class WorkoutsComponent implements OnInit {

    workouts: Workout[];
    workoutDuration;
    visible: boolean;

    constructor(private workoutService: WorkoutService, private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.initData();
    }

    private initData() {
        this.workoutService.getAll(Number(sessionStorage.getItem('id'))).then(data => {
            data = data.sort((a,b) =>
                 Date.parse(b.date) - Date.parse(a.date));
            this.workouts = data;

            this.workouts.forEach(workout => {
                let date = new Date(workout.date);
                workout.date = date.toLocaleDateString("en-US") + ' | ' + date.toLocaleTimeString("en-US");
            });
        });
    }

    showDialog() {
        this.visible = true;
    }

    createWorkout() {
        this.visible = false;

        this.workoutService.startWorkout({date: new Date(), workoutDuration: this.workoutDuration}).then(() => {
            this.messageService.add({severity: 'success', summary: "Success", detail: "Workout creation was successful!"});
            this.workoutDuration = null;
            this.initData();
        }).catch(() => {
            this.workoutDuration = null;
            this.messageService.add({
                severity: 'error',
                summary: "Error",
                detail: "There was a problem with workout creation!"
            });
        });
    }
}
