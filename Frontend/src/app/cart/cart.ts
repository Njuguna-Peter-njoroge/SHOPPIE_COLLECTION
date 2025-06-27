// cart.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly BASE_URL = `${environment.apiBaseUrl}/cart`;

  constructor(private http: HttpClient) {}

  addToCart(userId: string, body: { product: string; quantity: number }) {
    return this.http.post(`${this.BASE_URL}/add/${userId}`, body);
  }

  getCart(userId: string) {
    return this.http.get(`${this.BASE_URL}/${userId}`);
  }
}
