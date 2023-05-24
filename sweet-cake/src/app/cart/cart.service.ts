import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  getCartItems(): any[] {
    return this.cartItemsSubject.getValue();
  }

  getCartItemCount() {
    const cartItems = this.getCartItems();
    return cartItems.length;
  }

  addToCart(item: any) {
    const cartItems = this.getCartItems();
    const newCartItems = [...cartItems, item];
    this.cartItemsSubject.next(newCartItems);
  }

  removeFromCart(item: any) {
    const cartItems = this.getCartItems();
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
      cartItems.splice(index, 1);
      this.cartItemsSubject.next(cartItems);
    }
  }
}
