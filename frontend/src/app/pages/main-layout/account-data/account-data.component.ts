import { Component } from '@angular/core';
import {UserService} from "../../../services/user.service";

@Component({
    templateUrl: './account-data.component.html'
})
export class AccountDataComponent {
    username: string = sessionStorage.getItem('username');
    email: string = sessionStorage.getItem('email');
    password: string;
    confirmPassword: string;
    constructor(private userDataService: UserService) {
    }

    changePassword(){
        this.userDataService.changePassword({id: sessionStorage.getItem('id'),email: sessionStorage.getItem('email'), password: this.password}).subscribe(() =>{

        });
        alert('Password was changed');
    }
}
