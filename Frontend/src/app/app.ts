import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { LoginComponent } from './login/login';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, 
    ReactiveFormsModule
  ],
  templateUrl: './app.html'
})
export class App {
  protected title = 'Frontend';
}
