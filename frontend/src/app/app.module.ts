import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './pages/auth/notfound/notfound.component';
import {AccountDataComponent} from "./pages/main-layout/account-data/account-data.component";
import {ExercisesComponent} from "./pages/main-layout/exercises/exercises.component";
import {WorkoutsComponent} from "./pages/main-layout/workouts/workouts.component";
import {HomeComponent} from "./pages/main-layout/home/home.component";
import {UserDataComponent} from "./pages/main-layout/user-data/user-data.component";

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, AccountDataComponent, ExercisesComponent, WorkoutsComponent, HomeComponent, UserDataComponent

    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
