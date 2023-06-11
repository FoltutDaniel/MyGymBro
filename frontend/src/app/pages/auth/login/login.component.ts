import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    email!: string;
    password!: string;

    constructor(public layoutService: LayoutService, private messageService: MessageService, private authService: AuthService, private router: Router) { }

    login(){
        this.authService.login({email: this.email, password: this.password}).then(data =>{
            sessionStorage.setItem('username', data.user);
            sessionStorage.setItem('email', data.email);
            sessionStorage.setItem('token', 'Bearer ' + data.token);
            sessionStorage.setItem('id', data.id);
            this.router.navigateByUrl('');
            this.messageService.add({severity: 'success', summary: "Success", detail: "Login successful"});
        }).catch(() => {
            this.messageService.add({
                severity: 'error',
                summary: "Error",
                detail: "Invalid email / password combination!"
            });
        });
    }
}
