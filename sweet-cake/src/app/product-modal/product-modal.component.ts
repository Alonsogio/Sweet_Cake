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
  showFullDescription = false;

  carouselOptions: any = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  constructor(private cartService: CartService) {}

  onCloseModal() {
    this.closeModal.emit();
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  getProductImages(): string[] {
    const images = [];
    if (this.product?.img2) {
      images.push(this.product.img2);
    }
    if (this.product?.img3) {
      images.push(this.product.img3);
    }
    if (this.product?.img4) {
      images.push(this.product.img4);
    }
    return images;
  }
}
