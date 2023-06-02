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

  addToCart(item: any, quantity?: number) {
    const cartItems = this.getCartItems();
    const existingItem = cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      const newItem = { ...item, quantity: quantity || 1 };
      cartItems.push(newItem);
    }
    this.cartItemsSubject.next([...cartItems]);
  }

  clearCart(): void {
    const emptyCart: any[] = [];
    this.cartItemsSubject.next(emptyCart);
  }

  removeFromCart(item: any) {
    const cartItems = this.getCartItems();
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
      cartItems.splice(index, 1);
      this.cartItemsSubject.next(cartItems);
    }
  }

  getCartItemById(itemId: number): any {
    const cartItems = this.getCartItems();
    return cartItems.find((item) => item.id === itemId);
  }

  calculateDiscountedValue(product: any, discountValue: number): number {
    const discountedValue =
      product.value - product.value * (discountValue / 100);
    return discountedValue;
  }

  addProductWithDiscountToCart(product: any, quantity: number = 1) {
    const discountedValue = this.calculateDiscountedValue(product, 40);
    const item = {
      id: product.id,
      nameItem: product.nameItem,
      img: product.img,
      value: discountedValue.toFixed(2),
      quantity: quantity,
    };
    this.addToCart(item, quantity);
  }
}
