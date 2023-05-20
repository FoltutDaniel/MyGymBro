import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user.model";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private url = 'http://localhost:8080/auth';
    constructor(private httpClient: HttpClient) {
    }

    login(user: User): Observable<any>{
        return this.httpClient.post<any>(this.url + '/login', user);
    }

    register(user: User): Observable<any>{
        return this.httpClient.post<any>(this.url + '/register', user);
    }
}
