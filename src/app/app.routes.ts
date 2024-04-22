import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AboutComponent } from './components/about/about.component';
import { CreatebinComponent } from './components/createbin/createbin.component';
import { authGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ViewSnippetComponent } from './components/view-snippet/view-snippet.component';

export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'signup', component:SignupComponent},
    {path:'create', component:CreatebinComponent, canActivate:[authGuard]},
    // about is here a lazy component 
    {path:'about', loadComponent:() => import('./components/about/about.component').then(mod=>mod.AboutComponent)},
    {path:'', component:HomeComponent},
    {path:'snippet/:id', component:ViewSnippetComponent},
    {path:'**', component:NotfoundComponent}
];
