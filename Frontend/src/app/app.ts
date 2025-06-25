import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { LoginComponent } from './login/login';

export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'home', component: Homepage },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginComponent }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './app.html'
})
export class App {
  protected title = 'Frontend';
}
