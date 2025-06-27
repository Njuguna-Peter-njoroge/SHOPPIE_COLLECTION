import { Routes } from '@angular/router';
import {Homepage} from './homepage/homepage';
import {Dashboard} from './Admin/dashboard/dashboard';
import {EditProduct} from './Admin/edit-product/edit-product';
import {AddProduct} from './Admin/add-product/add-product';
import {LoginComponent} from './login/login';
import {ProductLandingComponent} from './Products/products/products';
import {AdmindashboardComponent} from './admindashboard.component/admindashboard.component';
import {CartService} from './cart/cart';


export let routes: Routes;
routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: LoginComponent},
  { path: 'admin-dashboard', component: AdmindashboardComponent },

  {path: 'home', component: Homepage},
  { path: 'products', component: ProductLandingComponent },
  {path: 'cart', component: CartService},

  {
    path: 'admin',
    component: Dashboard,
    children: [
      {path: 'edit-product', component: EditProduct},
      {path: 'add-product', component: AddProduct},
      {path: '', redirectTo: 'product-list', pathMatch: 'full'}
    ]
  },
  {path: '**', redirectTo: 'login'}
];
