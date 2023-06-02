import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  showSuccess(mensage: string, title: string) {
    this.toastr.success(`${mensage}`, `${title}`, {
      positionClass: 'toast-bottom-left',
      closeButton: true,
      timeOut: 3000,
    });
  }

  onCloseModal() {
    this.closeModal.emit();
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.showSuccess('Item adicionados ao carrinho com sucesso!', 'Sucess!');
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
