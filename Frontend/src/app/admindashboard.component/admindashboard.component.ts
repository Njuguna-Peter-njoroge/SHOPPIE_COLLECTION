import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet, Router } from '@angular/router';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { Navbar } from '../Component/navbar/navbar';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, Navbar, RouterOutlet, NgIf, NgFor, NgClass]
})
export class AdmindashboardComponent implements OnInit {
  productForm!: FormGroup;
  isUploading = false;
  imageUrl: string = '';
  isSubmitting = false;
  products: any[] = [];

  message = '';
  messageType: 'success' | 'error' | '' = '';

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

  showMessage(message: string, type: 'success' | 'error'): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 3000);
  }

  loadProducts(): void {
    this.http.get<any>('http://localhost:3000/products').subscribe({
      next: (res: any) => {
        if (res && Array.isArray(res.data)) {
          this.products = res.data.map((product: any) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
            imageUrl: product.imageUrl,
            category: product.category,
            stock: product.stock,
            status: product.status
          }));
        } else {
          this.showMessage('Unexpected server response.', 'error');
        }
      },
      error: (err) => {
        console.error('Failed to load products:', err);
        this.showMessage('Failed to load products.', 'error');
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
        this.showMessage('Image uploaded successfully.', 'success');
      },
      error: (err) => {
        console.error('Image upload failed', err);
        this.isUploading = false;
        this.showMessage('Image upload failed. Please try again.', 'error');
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid || !this.imageUrl) {
      if (!this.imageUrl) {
        this.showMessage('Please upload an image first.', 'error');
      }
      return;
    }

    this.isSubmitting = true;

    const productData = {
      ...this.productForm.value,
      price: Number(this.productForm.value.price),
      stock: Number(this.productForm.value.stock),
      imageUrl: this.imageUrl,
      status: 'AVAILABLE',
    };

    this.http.post<any>('http://localhost:3000/products', productData).subscribe({
      next: (res) => {
        this.productForm.reset();
        this.imageUrl = '';
        this.isSubmitting = false;
        this.showMessage('Product added successfully.', 'success');
        this.loadProducts();
      },
      error: (err) => {
        console.error('Product submission failed:', err);
        this.isSubmitting = false;
        const message = err?.error?.message || 'Failed to add product. Please try again.';
        this.showMessage(message, 'error');
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
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.http.delete(`http://localhost:3000/products/${productId}`).subscribe({
      next: () => {
        this.showMessage('Product deleted successfully.', 'success');
        this.loadProducts();
      },
      error: (err) => {
        console.error('Failed to delete product:', err);
        this.showMessage('Failed to delete product.', 'error');
      }
    });
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image';
  }
}
