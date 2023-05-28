import { CartService } from '../cart/cart.service';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartItems: any[] = [];
  showTooltip: boolean = false;
  isHeaderFixed = false;
  headerOffset = 0;

  constructor(private cartService: CartService) {
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.getHeaderOffset();
    this.checkHeaderPosition();
  }

  @HostListener('window:scroll')
  checkHeaderPosition() {
    const scrollPosition = window.pageYOffset;

    if (
      scrollPosition >= this.headerOffset &&
      scrollPosition <= this.headerOffset + 100
    ) {
      this.isHeaderFixed = false;
    } else {
      this.isHeaderFixed = true;
    }
  }

  getHeaderOffset() {
    const headerElement = document.querySelector('.mat-toolbar');
    if (headerElement) {
      const { top } = headerElement.getBoundingClientRect();
      this.headerOffset = top + window.pageYOffset;
    }
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
