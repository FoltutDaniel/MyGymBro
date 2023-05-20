import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Exercise} from "../model/exercise.model";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
    private url = 'http://localhost:8080/exercise';
    constructor(private httpClient: HttpClient) {
    }

    getAllExercises(): Observable<Exercise[]>{
        return this.httpClient.get<Exercise[]>(this.url+'getAll');
    }
}
