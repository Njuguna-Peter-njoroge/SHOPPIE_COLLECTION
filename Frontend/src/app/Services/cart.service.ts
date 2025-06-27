import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  addToCart(product: string, quantity?: { product: string; quantity: number }): Observable<any> {
    const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : null;
    if (!userId) {
      throw new Error('User not logged in');
    }

    const cartItem = {
      productId: product,
      quantity: quantity,
      userId: userId
    };

    return this.http.post(`${this.apiUrl}/add`, cartItem);
  }

  getCart(): Observable<Cart> {
    const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : null;
    if (!userId) {
      return new Observable(subscriber => {
        subscriber.next({ items: [], totalPrice: 0 });
        subscriber.complete();
      });
    }
    return this.http.get<Cart>(`${this.apiUrl}/${userId}`);
  }

  updateCartItem(itemId: string, quantity: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/items/${itemId}`, { quantity });
  }

  removeFromCart(itemId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/items/${itemId}`);
  }

  clearCart(): Observable<any> {
    const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : null;
    if (!userId) {
      return new Observable(subscriber => {
        subscriber.next({});
        subscriber.complete();
      });
    }
    return this.http.delete(`${this.apiUrl}/${userId}`);
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
