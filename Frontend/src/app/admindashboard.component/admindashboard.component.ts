import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Navbar} from '../Component/navbar/navbar';
import {RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  imports: [
    ReactiveFormsModule,
    Navbar,
    RouterOutlet,
    NgIf
  ],
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  productForm!: FormGroup;
  isUploading = false;
  imageUrl: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.isUploading = true;

    const formData = new FormData();
    formData.append('image', file); // backend expects 'image'

    this.http.post<{ imageUrl: string }>('http://localhost:3000/products/upload', formData).subscribe({
      next: (res) => {
        this.imageUrl = res.imageUrl;
        this.isUploading = false;
      },
      error: (err) => {
        console.error('Image upload failed', err);
        this.isUploading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid || !this.imageUrl) return;

    const productData = {
      ...this.productForm.value,
      imageUrl: this.imageUrl,
    };

    this.http.post('http://localhost:3000/products', productData).subscribe({
      next: () => {
        alert('Product added successfully!');
        this.productForm.reset();
        this.imageUrl = '';
      },
      error: (err) => {
        console.error('Product submission failed', err);
      }
    });
  }

}
