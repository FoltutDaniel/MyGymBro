import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class RegisterComponent {

    valCheck: string[] = ['remember'];

    username!: string;
    email!:string;
    password!: string;

    constructor(public layoutService: LayoutService, private authService: AuthService, private router: Router) { }

    register(){
        this.authService.register({userName: this.username, password: this.password, email: this.email}).subscribe(() =>{
            this.router.navigateByUrl('auth/login');
        })
    }
}
