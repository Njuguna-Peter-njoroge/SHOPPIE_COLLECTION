import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../Services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  loading = false;
  editingIndex: number | null = null;
  editedQuantity: number | null = null;
  editedPrice: number | null = null;
  isAdmin = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.getUserRole() === 'ADMIN';
    this.loadCart();
  }

  loadCart(): void {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cartItems = cart.items || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  startEdit(index: number): void {
    this.editingIndex = index;
    if (this.isAdmin) {
      this.editedPrice = this.cartItems[index].product.price;
    }
    this.editedQuantity = this.cartItems[index].quantity;
  }

  saveEdit(index: number): void {
    if (this.editedQuantity != null && this.cartItems[index].id) {
      if (this.isAdmin && this.editedPrice != null) {
        this.cartService.updateCartItemAndPrice(this.cartItems[index].id!, this.editedQuantity, this.editedPrice).subscribe({
          next: () => {
            this.cartItems[index].quantity = this.editedQuantity!;
            this.cartItems[index].product.price = this.editedPrice!;
            this.editingIndex = null;
            this.editedPrice = null;
            this.editedQuantity = null;
            this.toastr.success('Cart item updated successfully');
          },
          error: () => {
            this.toastr.error('Failed to update cart item');
          }
        });
      } else {
        this.cartService.updateCartItem(this.cartItems[index].id!, this.editedQuantity).subscribe({
          next: () => {
            this.cartItems[index].quantity = this.editedQuantity!;
            this.editingIndex = null;
            this.editedQuantity = null;
            this.toastr.success('Cart item updated successfully');
          },
          error: () => {
            this.toastr.error('Failed to update cart item');
          }
        });
      }
    } else {
      this.editingIndex = null;
      this.editedQuantity = null;
    }
  }

  cancelEdit(): void {
    this.editingIndex = null;
    this.editedQuantity = null;
  }

  removeItem(index: number): void {
    const item = this.cartItems[index];
    if (item.id) {
      this.cartService.removeFromCart(item.id).subscribe({
        next: () => {
          this.cartItems.splice(index, 1);
          this.toastr.success('Item removed from cart');
        },
        error: () => {
          this.toastr.error('Failed to remove item from cart');
        }
      });
    } else {
      this.cartItems.splice(index, 1);
      this.toastr.success('Item removed from cart');
    }
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.product.price || 0) * (item.quantity || 1), 0);
  }

  checkout(): void {
    this.cartService.clearCart().subscribe({
      next: () => {
        this.toastr.success('Checkout successful!');
        this.cartItems = [];
        this.router.navigate(['/products']);
      },
      error: () => {
        this.toastr.error('Checkout failed');
      }
    });
  }
}
