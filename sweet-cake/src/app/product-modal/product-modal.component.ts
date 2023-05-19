import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css'],
})
export class ProductModalComponent {
  @Input() product: any;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor(private cartService: CartService) {}

  onCloseModal() {
    this.closeModal.emit(); // Emite um evento para fechar o modal
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
