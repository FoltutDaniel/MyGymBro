import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {NotfoundComponent} from './pages/auth/notfound/notfound.component';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {AccountDataComponent} from "./pages/main-layout/account-data/account-data.component";
import {ExercisesComponent} from "./pages/main-layout/exercises/exercises.component";
import {WorkoutsComponent} from "./pages/main-layout/workouts/workouts.component";
import {HomeComponent} from "./pages/main-layout/home/home.component";
import {UserDataComponent} from "./pages/main-layout/user-data/user-data.component";
import {AuthGuard} from "./pages/auth/guards/auth.guard";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'auth', loadChildren: () => import('./pages/auth.module').then(m => m.AuthModule)
            },
            {
                path: 'landing',
                loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule)
            },
            {
                path: 'notfound', component: NotfoundComponent
            },
            {
                path: '', component: AppLayoutComponent, canActivate: [AuthGuard],
                children: [
                    {path: 'account-data', component: AccountDataComponent},
                    {path: 'exercises', component: ExercisesComponent},
                    {path: 'home', component: HomeComponent},
                    {path: 'workouts', component: WorkoutsComponent},
                    {path: 'user-data', component: UserDataComponent}
                ]
            },
            {path: '**', redirectTo: '/landing'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
