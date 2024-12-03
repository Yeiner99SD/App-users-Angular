import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { FormUserComponent } from './components/form-user/form-user.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo:'/users'},
    {path: 'users', component: UserComponent},
    {path: 'users/create', component: FormUserComponent},
    {path:'users/edit/:id', component: FormUserComponent}
];
