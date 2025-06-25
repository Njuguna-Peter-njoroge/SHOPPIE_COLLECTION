import { Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { LoginComponent } from './login/login';

export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: Homepage },
];
