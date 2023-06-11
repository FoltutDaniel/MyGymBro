import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Workout} from "../model/workout.model";
import {Observable} from "rxjs";
import {Exercise} from "../model/exercise.model";
import {WorkoutExercise} from "../model/workout-exercise.model";

@Injectable({
    providedIn: 'root'
})
export class WorkoutService {
    private url = 'https://localhost:7220/workout';
    constructor(private httpClient: HttpClient) {
    }

    startWorkout(workout: any): Promise<Workout>{
        let userId = sessionStorage.getItem('id');
        return this.httpClient.post<Workout>(this.url+'/start-workout/' + userId, workout).toPromise();
    }

    addExerciseToWorkout(workoutExercise: any, workoutId: number): Promise<Workout>{
        return this.httpClient.put<Workout>(this.url+'/add-exercise/' + workoutId, workoutExercise).toPromise();
    }

    removeExerciseToWorkout(workoutExercise: WorkoutExercise, workoutId: number): Observable<Workout>{
        return this.httpClient.put<Workout>(this.url+'/remove-exercise/' + workoutId, workoutExercise);
    }

    getAll(userId: number): Promise<Workout[]>{
        return this.httpClient.get<Workout[]>(this.url+'/get-all/'+ userId).toPromise();
    }
}
