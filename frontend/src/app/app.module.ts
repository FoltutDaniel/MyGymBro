import {NgModule} from '@angular/core';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppLayoutModule} from './layout/app.layout.module';
import {NotfoundComponent} from './pages/auth/notfound/notfound.component';
import {AccountDataComponent} from "./pages/main-layout/account-data/account-data.component";
import {ExercisesComponent} from "./pages/main-layout/exercises/exercises.component";
import {WorkoutsComponent} from "./pages/main-layout/workouts/workouts.component";
import {HomeComponent} from "./pages/main-layout/home/home.component";
import {UserDataComponent} from "./pages/main-layout/user-data/user-data.component";
import {AuthInterceptor} from "./pages/auth/interceptors/auth.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, AccountDataComponent, ExercisesComponent, WorkoutsComponent, HomeComponent, UserDataComponent

    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        CommonModule,
        ButtonModule,
        DialogModule,
        DropdownModule,
        InputNumberModule,
        FormsModule
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
