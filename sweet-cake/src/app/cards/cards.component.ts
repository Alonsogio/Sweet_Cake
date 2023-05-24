import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { data } from '../../data/database';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { trigger, style, transition, animate } from '@angular/animations';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class CardsComponent {
  items: any[] = data.map((item) => ({ ...item, quantity: 0 }));
  modalRef: BsModalRef<any> | undefined;
  filteredItems: any[] = this.items;
  selectedTag: string = 'all';

  filterCards(tag: string) {
    this.selectedTag = tag;
    if (tag === 'all') {
      setTimeout(() => {
        this.filteredItems = this.items;
      }, 100);
    } else {
      setTimeout(() => {
        this.filteredItems = this.items.filter((item) => item.tag === tag);
      }, 100);
    }
  }

  constructor(
    private modalService: BsModalService,
    private cartService: CartService
  ) {}

  openModal(productId: number) {
    const product = this.items.find((item) => item.id === productId);
    if (product) {
      const initialState = {
        product: product,
      };
      this.modalRef = this.modalService.show(ProductModalComponent, {
        initialState,
      });
      this.modalRef.content.closeModal.subscribe(() => {
        this.modalRef?.hide();
        document.body.classList.remove('modal-open');
      });
      document.body.classList.add('modal-open');
    }
  }
  addAllToCart() {
    for (const item of this.filteredItems) {
      if (item.quantity > 0) {
        this.cartService.addToCart(item);
        item.quantity = 0;
      }
    }
    this.selectedItems = 0;
  }
  closeModal() {
    this.modalRef?.hide();
    document.body.classList.remove('modal-open');
  }

  selectedItems: number = 0;

  increment(event: Event, item: any) {
    event.stopPropagation();
    item.quantity++;
    this.selectedItems++;
  }

  decrement(event: Event, item: any) {
    event.stopPropagation();
    if (item.quantity > 0) {
      item.quantity--;
      this.selectedItems--;
    }
  }
}
