import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../Services/product.service';
import { CartService } from '../Services/cart.service';
import { Product } from '../Products/products/product.model';
import {Navbar} from '../Component/navbar/navbar'; // ✅ import Product interface
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user-page.compoenent.html',
  styleUrls: ['./user-page.compoenent.css'],
  imports: [
    CommonModule,
    Navbar
  ]
})
export class UserComponent implements OnInit {
  products: Product[] = []; // ✅ use correct type
  userId: string | null = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!).id
    : null;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = Array.isArray(res) ? res : res.data || [];
      },
      error: () => this.toastr.error('Failed to load products'),
    });
  }

  onAddToCart(product: Product): void {
    if (!this.userId) {
      this.toastr.error('Please login to add items to cart', 'Login Required');
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.addToCart(product, 1).subscribe({
      next: () => this.toastr.success('Product added to cart'),
      error: (err) => {
        console.error(err);
        this.toastr.error(err.error?.message || 'Failed to add to cart');
      },
    });
  }
}
