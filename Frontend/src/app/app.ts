import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Homepage } from './homepage/homepage';
import { LoginComponent } from './login/login';
import {ReactiveFormsModule} from '@angular/forms';
import {ProductLandingComponent} from './Products/products/products';
import {ProductList} from './Admin/product-list/product-list';

export const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'home', component: Homepage },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginComponent },
  { path: 'product', component: ProductLandingComponent }

];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, ReactiveFormsModule, ProductLandingComponent, ProductList
  ],
  templateUrl: './app.html'
})
export class App {
  protected title = 'Frontend';
}
