import { Component } from '@angular/core';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  cartItems: any[] = [];
  showTooltip: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }

  showProductTooltip() {
    this.showTooltip = true;
  }

  hideProductTooltip() {
    this.showTooltip = false;
  }

  removeFromCart(product: any) {
    this.cartService.removeFromCart(product);
    this.cartItems = this.cartService.getCartItems();
  }
}
