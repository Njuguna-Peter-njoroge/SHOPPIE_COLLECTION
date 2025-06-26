import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../Services/product.service';
import { Product } from './product.model';
import { Navbar } from '../../Component/navbar/navbar';

@Component({
  selector: 'app-product-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class ProductLandingComponent implements OnInit {
  products: Product[] = [];
  searchQuery: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (err) => {
        console.error('Failed to fetch products:', err);
      },
    });
  }

  filteredProducts(): Product[] {
    const query = this.searchQuery.toLowerCase();
    return this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
  }

  addToCart(product: Product): void {
    console.log('Adding to cart:', product);
    // Implement cart logic here
  }
}
