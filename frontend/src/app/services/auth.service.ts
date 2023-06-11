import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private url = 'https://localhost:7220/auth';
    constructor(private httpClient: HttpClient, private router: Router) {
    }

    login(user: any): any{
        return this.httpClient.post<any>(this.url + '/login', user).toPromise();
    }

    register(user: any): Promise<any>{
        return this.httpClient.post<any>(this.url + '/register', user).toPromise();
    }
}
