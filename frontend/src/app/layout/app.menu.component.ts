import {OnInit} from '@angular/core';
import {Component} from '@angular/core';
import {LayoutService} from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) {
    }

    ngOnInit() {
        this.model = [
            {
                label: '',
                items: [
                    {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home']},
                    {label: 'Workouts', icon: 'pi pi-fw pi-history', routerLink: ['/workouts']},
                    {label: 'Exercises', icon: 'pi pi-fw pi-heart', routerLink: ['/exercises']},
                    {label: 'User Data', icon: 'pi pi-fw pi-cog', routerLink: ['/user-data']}
                ]
            }
        ];
    }
}
