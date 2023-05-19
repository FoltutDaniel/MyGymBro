import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'error', loadChildren: () => import('./auth/error/error.module').then(m => m.ErrorModule) },
        { path: 'access', loadChildren: () => import('./auth/access/access.module').then(m => m.AccessModule) },
        { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
        { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
        { path: '**', redirectTo: '/login' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }

