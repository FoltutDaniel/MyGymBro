import {Component} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform: scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService]
})
export class RegisterComponent {

    valCheck: string[] = ['remember'];

    username!: string;
    email!: string;
    password!: string;

    constructor(public layoutService: LayoutService, private authService: AuthService, private messageService: MessageService, private router: Router) {
    }

    register() {
        if(this.username?.length < 3){
            this.messageService.add({
                severity: 'error',
                summary: "Error",
                detail: "Username must have 3 ore more letters!"
            });
            return;
        }
        if(this.password?.length < 5){
            this.messageService.add({
                severity: 'error',
                summary: "Error",
                detail: "Password must have 5 ore more letters!"
            });
            return;;
        }
        let re = /\S+@\S+\.\S+/;
        let isEmailValid = re.test(this.email);
        debugger;
        if(!isEmailValid){
            this.messageService.add({
                severity: 'error',
                summary: "Error",
                detail: "Email is invalid!"
            });
            return;
        }
        this.authService.register({
            userName: this.username,
            password: this.password,
            email: this.email
        }).then(() => {
            this.router.navigateByUrl('auth/login');
            this.messageService.add({severity: 'success', summary: "Success", detail: "Register successful"});
        }).catch((message) => {
            if(message.status === 200){
                this.router.navigateByUrl('auth/login');
                this.messageService.add({severity: 'success', summary: "Success", detail: "Register successful"});
            }
            this.messageService.add({
                severity: 'error',
                summary: "Error",
                detail: "Username or email already in use!"
            });
        });
    }
}
