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
    private url = 'http://localhost:8080/workout';
    constructor(private httpClient: HttpClient) {
    }

    startWorkout(workout: Workout): Observable<Workout>{
        return this.httpClient.post<Workout>(this.url+'/start-workout', workout);
    }

    addExerciseToWorkout(workoutExercise: WorkoutExercise, workoutId: number): Observable<Workout>{
        return this.httpClient.put<Workout>(this.url+'/add-exercise/' + workoutId, workoutExercise);
    }

    removeExerciseToWorkout(workoutExercise: WorkoutExercise, workoutId: number): Observable<Workout>{
        return this.httpClient.put<Workout>(this.url+'/remove-exercise/' + workoutId, workoutExercise);
    }

    getAll(userId: number): Observable<Workout[]>{
        return this.httpClient.get<Workout[]>(this.url+'/get-all/'+ userId);
    }
}
