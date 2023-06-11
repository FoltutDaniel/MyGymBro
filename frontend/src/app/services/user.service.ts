import {Injectable} from '@angular/core';
import {UserData} from "../model/user-data.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private url = 'https://localhost:7220/user';
    constructor(private httpClient: HttpClient) {
    }

    getUserData(userId: number):Observable<UserData>{
        const options = sessionStorage.getItem('id') ?
            { params: new HttpParams().set('id',  sessionStorage.getItem('id')) } : {};
        return this.httpClient.get<UserData>(this.url+"/user-data", options);
    }

    updateUserData(userData: any):Promise<UserData>{
        const options = sessionStorage.getItem('id') ?
            { params: new HttpParams().set('id',  userData.id) } : {};
        return this.httpClient.post<UserData>(this.url+"/user-data", userData, options).toPromise();
    }

    changePassword(user: any):Promise<any>{
        return this.httpClient.post<any>(this.url+"/change-password", user).toPromise();
    }

}
