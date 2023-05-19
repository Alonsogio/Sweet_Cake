import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: any[] = [];

  constructor() {}

  addToCart(product: any) {
    this.cartItems.push(product);
  }

  removeFromCart(product: any) {
    const index = this.cartItems.indexOf(product);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  getCartItemCount() {
    return this.cartItems.length;
  }
}
