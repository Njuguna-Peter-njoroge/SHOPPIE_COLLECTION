import { Routes } from '@angular/router';
import {Homepage} from './homepage/homepage';
import {Cart} from './cart/cart';
import {Dashboard} from './Admin/dashboard/dashboard';
import {EditProduct} from './Admin/edit-product/edit-product';
import {AddProduct} from './Admin/add-product/add-product';
import {ProductList} from './Admin/product-list/product-list';
import {LoginComponent} from './login/login';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // {path:'', pathMatch:'full', component:  LoginComponent },
  {path : 'login', component: LoginComponent},
  {path: 'home', component:Homepage},
  {path: 'cart', component:Cart},

  {path: 'admin', component: Dashboard,
    children: [
      {path: 'edit-product', component: EditProduct},
      {path:'add-product', component: AddProduct},
      {path:'product-list', component:ProductList},
      {path:'view-Users',  component:ProductList},
      {path:'', redirectTo: 'product-list', pathMatch: 'full'}
    ]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'},


];
