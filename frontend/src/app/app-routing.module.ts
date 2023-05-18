import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {NotfoundComponent} from './demo/components/notfound/notfound.component';
import {AppLayoutComponent} from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule)
            },
            {
                path: 'landing',
                loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule)
            },
            {
                path: 'notfound', component: NotfoundComponent
            },
            {
                path: 'main', component: AppLayoutComponent,
            },
            {path: '**', redirectTo: '/landing'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
