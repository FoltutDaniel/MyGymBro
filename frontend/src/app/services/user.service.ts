import {Injectable} from '@angular/core';
import {UserData} from "../model/user-data.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private url = 'http://localhost:8080/user';
    constructor(private httpClient: HttpClient) {
    }

    getUserData(userId: number):Observable<UserData>{
        return this.httpClient.get<UserData>(this.url+"/user-data");
    }

    updateUserData(userData: UserData):Observable<UserData>{
        return this.httpClient.post<UserData>(this.url+"/user-data", userData);
    }

    changePassword(user: User):Observable<any>{
        return this.httpClient.post<any>(this.url+"/change-password", user);
    }

}
