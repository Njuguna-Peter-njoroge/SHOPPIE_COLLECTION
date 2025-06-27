import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Navbar} from '../Component/navbar/navbar';
import {RouterOutlet, Router} from '@angular/router';
import {NgIf, NgFor} from '@angular/common';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  imports: [
    ReactiveFormsModule,
    Navbar,
    RouterOutlet,
    NgIf,
    NgFor
  ],
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  productForm!: FormGroup;
  isUploading = false;
  imageUrl: string = '';
  isSubmitting = false;
  products: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      stock: [1, [Validators.required, Validators.min(1)]],
    });

    this.loadProducts();
  }

  loadProducts(): void {
    this.http.get<any[]>('http://localhost:3000/products').subscribe({
      next: (products: any) => {
        if (Array.isArray(products)) {
          this.products = products.map((product: any) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
            imageUrl: product.imageUrl,
            category: product.category,
            stock: product.stock,
            status: product.status
          }));
        } else if (products && Array.isArray(products.data)) {
          this.products = products.data.map((product: any) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
            imageUrl: product.imageUrl,
            category: product.category,
            stock: product.stock,
            status: product.status
          }));
        }
      },
      error: (err) => {
        console.error('Failed to load products:', err);
      }
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.isUploading = true;

    const formData = new FormData();
    formData.append('image', file);

    this.http.post<{ imageUrl: string }>('http://localhost:3000/products/upload', formData).subscribe({
      next: (res) => {
        this.imageUrl = res.imageUrl;
        this.isUploading = false;
      },
      error: (err) => {
        console.error('Image upload failed', err);
        this.isUploading = false;
        alert('Image upload failed. Please try again.');
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid || !this.imageUrl) {
      if (!this.imageUrl) {
        alert('Please upload an image first');
      }
      return;
    }

    this.isSubmitting = true;

    const productData = {
      ...this.productForm.value,
      imageUrl: this.imageUrl,
      status: 'AVAILABLE'
    };

    this.http.post('http://localhost:3000/products', productData).subscribe({
      next: () => {
        alert('Product added successfully!');
        this.productForm.reset();
        this.imageUrl = '';
        this.isSubmitting = false;
        this.loadProducts();
      },
      error: (err) => {
        console.error('Product submission failed', err);
        this.isSubmitting = false;
        alert('Failed to add product. Please try again.');
      }
    });
  }

  viewProducts(): void {
    this.router.navigate(['/products']);
  }

  editProduct(productId: string): void {
    this.router.navigate(['/admin/edit-product', productId]);
  }

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.http.delete(`http://localhost:3000/products/${productId}`).subscribe({
        next: () => {
          alert('Product deleted successfully!');
          this.loadProducts();
        },
        error: (err) => {
          console.error('Failed to delete product:', err);
          alert('Failed to delete product. Please try again.');
        }
      });
    }
  }
}
