import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../Services/product.service';
import { CartService } from '../../Services/cart.service';
import { Product } from './product.model';
import { Navbar } from '../../Component/navbar/navbar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class ProductLandingComponent implements OnInit {
  searchQuery: string = '';
  placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPgo=';

  products = [
    {
      name: 'Sample Product',
      category: 'Electronics',
      description: 'This is a test product.',
      price: 29.99,
      imageUrl: this.placeholderImage,
    },
  ];
  
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        console.log('Products response:', res);
        // Handle the API response structure
        if (Array.isArray(res)) {
          // Backend returns array of objects with data property
          this.products = res.map((item: any) => {
            const product = item.data;
            return {
              id: product.id,
              name: product.name,
              description: product.description,
              price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
              imageUrl: product.imageUrl,
              category: product.category,
              stock: product.stock,
              status: product.status
            };
          });
        }
        console.log('Processed products:', this.products);
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
    
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      this.toastr.error('Please login to add items to cart', 'Login Required');
      return;
    }

    // Check if product is in stock
    if (product.stock && product.stock <= 0) {
      this.toastr.error('Product is out of stock', 'Out of Stock');
      return;
    }

    this.cartService.addToCart(product, 1).subscribe({
      next: (response) => {
        console.log('Added to cart:', response);
        this.toastr.success(`${product.name} added to cart!`, 'Success');
        // Refresh cart data
        this.cartService.getCart().subscribe(cart => {
          console.log('Updated cart:', cart);
        });
      },
      error: (err) => {
        console.error('Failed to add to cart:', err);
        this.toastr.error('Failed to add item to cart', 'Error');
      }
    });
  }

  onImageError(event: any): void {
    // Set a fallback image when the original image fails to load
    event.target.src = this.placeholderImage;
  }
}
