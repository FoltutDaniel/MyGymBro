import {Component, OnInit} from '@angular/core';
import {WorkoutService} from "../../../services/workout.service";

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
    basicData: any;

    basicOptions: any;
    workouts;
    nrOfWorkoutsPerWeek: number[] = [0, 0 ,0 ,0];

    constructor(private workoutService: WorkoutService) {
    }

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.workoutService.getAll(Number(sessionStorage.getItem('id'))).then(data => {
            this.workouts = data;
            this.workouts.forEach(workout => {
                let date = new Date(workout.date);
                workout.date = date.toLocaleDateString("en-US") + ' | ' + date.toLocaleTimeString("en-US");
            });
            let currentMonth = new Date().getMonth() + 1;
            let events = this.workouts.filter(workout => {
                let dateStr = currentMonth;
                return (workout.date.indexOf(dateStr) !== -1)
            });
            events.forEach(workout => {
                let date = new Date(workout.date);
                let weekOfMonth = (0 | date.getDate() / 7)+1;
                this.nrOfWorkoutsPerWeek[weekOfMonth] = this.nrOfWorkoutsPerWeek[weekOfMonth] + 1;
            });

        }).finally( () =>{
            this.basicData = {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [
                    {
                        label: 'Workouts this month',
                        data: [this.nrOfWorkoutsPerWeek[0], this.nrOfWorkoutsPerWeek[1], this.nrOfWorkoutsPerWeek[2], this.nrOfWorkoutsPerWeek[3]],
                        backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                        borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                        borderWidth: 1
                    }
                ]
            };

            this.basicOptions = {
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    },
                    x: {
                        ticks: {
                            color: textColorSecondary
                        },
                        grid: {
                            color: surfaceBorder,
                            drawBorder: false
                        }
                    }
                }
            };
        });
    }
}
