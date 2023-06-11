import { Component } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {MessageService} from "primeng/api";

@Component({
    templateUrl: './account-data.component.html',
    providers: [MessageService]
})
export class AccountDataComponent {
    username: string = sessionStorage.getItem('username');
    email: string = sessionStorage.getItem('email');
    password: string = '';
    confirmPassword: string = '';
    constructor(private userDataService: UserService, private messageService: MessageService) {
    }

    changePassword(){
        if(this.password.length < 5){
            this.messageService.add({
                severity: 'error',
                summary: "Error",
                detail: "Password must have 5 or more characters!"
            });
            return;
        }
        if(this.password !== this.confirmPassword){
            this.messageService.add({
                severity: 'error',
                summary: "Error",
                detail: "Passwords do not match!"
            });
            return;
        }
        this.userDataService.changePassword({id: sessionStorage.getItem('id'),email: sessionStorage.getItem('email'), password: this.password}).then(() =>{
            this.messageService.add({
                severity: 'success',
                summary: "Success",
                detail: "Password was changed"
            });
        }).catch(() => {
            this.messageService.add({
                severity: 'error',
                summary: "Error",
                detail: "There was an error in updating the password!"
            });
        });
    }
}
