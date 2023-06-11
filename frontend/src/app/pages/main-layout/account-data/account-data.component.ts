import { Component } from '@angular/core';
import {UserService} from "../../../services/user.service";

@Component({
    templateUrl: './account-data.component.html'
})
export class AccountDataComponent {
    password: string;
    confirmPassword: string;
    constructor(private userDataService: UserService) {
    }

    changePassword(){
        this.userDataService.changePassword({id: sessionStorage.getItem('id'),userName: sessionStorage.getItem('username'), password: this.password}).subscribe(() =>{
            alert('Password was changed');
        });
    }
}
