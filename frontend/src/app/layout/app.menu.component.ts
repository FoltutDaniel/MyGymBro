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
                    {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/uikit/formlayout']},
                    {label: 'Workouts', icon: 'pi pi-fw pi-history', routerLink: ['/uikit/button']},
                    {label: 'Exercises', icon: 'pi pi-fw pi-heart', routerLink: ['/uikit/charts']},
                    {label: 'Settings', icon: 'pi pi-fw pi-cog', routerLink: ['/uikit/']}
                ]
            }
        ];
    }
}
