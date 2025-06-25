import { Component } from '@angular/core';
import {Navbar} from '../Component/navbar-product/navbar-product';

@Component({
  selector: 'app-product',
  imports: [
    Navbar
  ],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {

}
