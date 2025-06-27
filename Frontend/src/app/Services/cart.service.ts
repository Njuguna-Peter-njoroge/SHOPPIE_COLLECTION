import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../Products/products/product.model';

export interface CartItem {
  id?: string;
  productId: string;
  product: Product;
  quantity: number;
  userId?: string;
}

export interface Cart {
  id?: string;
  userId?: string;
  items: CartItem[];
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/cart';
  private cartSubject = new BehaviorSubject<Cart>({ items: [], totalPrice: 0 });
  public cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  private loadCart(): void {
    const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : null;
    if (userId) {
      this.getCart().subscribe({
        next: (cart) => {
          this.cartSubject.next(cart);
        },
        error: (err) => {
          console.error('Failed to load cart:', err);
        }
      });
    }
  }

  addToCart(product: Product, quantity: number = 1): Observable<any> {
    const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : null;
    if (!userId) {
      throw new Error('User not logged in');
    }
    const cartItem = {
      productId: product.id,
      quantity
    };
    return this.http.post(`${this.apiUrl}/add/${userId}`, cartItem, { headers: this.getAuthHeaders() });
  }

  getCart(): Observable<Cart> {
    const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : null;
    if (!userId) {
      return new Observable(subscriber => {
        subscriber.next({ items: [], totalPrice: 0 });
        subscriber.complete();
      });
    }
    return new Observable<Cart>(subscriber => {
      this.http.get<any>(`${this.apiUrl}/${userId}`, { headers: this.getAuthHeaders() }).subscribe({
        next: (response) => {
          if (response && response.success && response.data) {
            subscriber.next(response.data);
          } else {
            subscriber.next({ items: [], totalPrice: 0 });
          }
          subscriber.complete();
        },
        error: (err) => {
          subscriber.next({ items: [], totalPrice: 0 });
          subscriber.complete();
        }
      });
    });
  }

  updateCartItem(itemId: string, quantity: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/items/${itemId}`, { quantity }, { headers: this.getAuthHeaders() });
  }

  updateCartItemAndPrice(itemId: string, quantity: number, price: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/items/${itemId}`, { quantity, price }, { headers: this.getAuthHeaders() });
  }

  removeFromCart(itemId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/items/${itemId}`, { headers: this.getAuthHeaders() });
  }

  clearCart(): Observable<any> {
    const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : null;
    if (!userId) {
      return new Observable(subscriber => {
        subscriber.next({});
        subscriber.complete();
      });
    }
    return this.http.delete(`${this.apiUrl}/${userId}`, { headers: this.getAuthHeaders() });
  }

  getCartItemCount(): number {
    const cart = this.cartSubject.value;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  }

  getCartTotal(): number {
    const cart = this.cartSubject.value;
    return cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }
}
