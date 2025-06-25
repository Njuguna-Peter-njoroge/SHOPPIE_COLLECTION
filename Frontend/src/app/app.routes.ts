import { Routes } from '@angular/router';
import {Homepage} from './homepage/homepage';
import {Cart} from './cart/cart';
import {Dashboard} from './Admin/dashboard/dashboard';
import {EditProduct} from './Admin/edit-product/edit-product';
import {AddProduct} from './Admin/add-product/add-product';
import {ProductList} from './Admin/product-list/product-list';
import {LoginComponent} from './login/login';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'',},
  // { path: 'login', component: LoginComponent },
  { path: 'signup', component: LoginComponent },
  { path: 'home', component: Homepage },
  // { path: 'products', component: ProductsComponent }, // New route

  { path: 'products', component:ProductList },
  { path: 'cart', component: Cart },

  {
    path: 'admin',
    component: Dashboard,
    children: [
      { path: 'edit-product', component: EditProduct },
      { path: 'add-product', component: AddProduct },
      { path: 'product-list', component: ProductList },
      { path: 'view-users', component: ProductList },
      { path: '', redirectTo: 'product-list', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
