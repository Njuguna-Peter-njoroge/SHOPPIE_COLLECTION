import {RouterModule, Routes} from '@angular/router';
import {Homepage} from './Component/homepage/homepage';
import {About} from './Component/about/about';
import {Products} from './Component/products/products';
import {Cart} from './Component/cart/cart';
import {Contact} from './Component/contact/contact';
import {NgModule} from '@angular/core';
import {LoginComponent} from './Component/logincomponent/logincomponent';




export const routes: Routes = [
  {
  path: 'homepage',
  component:Homepage
},
  {
    path:'about',
    component: About
  },

  {
    path: 'products',
    component:Products
  },

  {
    path:'cart',
    component:Cart
  },
  {
    path:'contact',
    component:Contact
  },
  {
path:'app-login',
    component:LoginComponent
  },
  { path: '', redirectTo: 'app-login', pathMatch: 'full' },
];
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
