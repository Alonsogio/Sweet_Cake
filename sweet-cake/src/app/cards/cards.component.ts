import { Component } from '@angular/core';
import { ProductDiscountComponent } from '../product-discount/product-discount.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { data } from '../../data/database';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { trigger, style, transition, animate } from '@angular/animations';
import { CartService } from '../cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../shared.service';

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
  items: any[] = data.map((item) => ({
    ...item,
    quantity: 0,
    likes: 0,
    liked: false,
  }));
  modalRef: BsModalRef<any> | undefined;
  filteredItems: any[] = this.items;
  quantity4 = 0;
  selectedTag: string = 'all';
  discountedProductId: any;
  discountValue: any;
  productDiscountComponent!: ProductDiscountComponent;

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
    private cartService: CartService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) {}

  showSuccess(mensage: string, title: string) {
    this.toastr.success(`${mensage}`, `${title}`, {
      positionClass: 'toast-bottom-left',
      closeButton: true,
      timeOut: 3000,
    });
  }

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
        if (item.id !== this.sharedService.discountedProduct.id) {
          this.cartService.addToCart(item, item.quantity);
        } else {
          this.cartService.addProductWithDiscountToCart(item, item.quantity);
        }
        item.quantity = 0;
      }
    }

    this.selectedItems = 0;
    this.showSuccess('Itens adicionados ao carrinho com sucesso!', 'Sucesso!');
  }

  closeModal() {
    this.modalRef?.hide();
    document.body.classList.remove('modal-open');
  }

  getStars(count: number): any[] {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < count);
    }
    return stars;
  }

  selectedItems: number = 0;

  incrementLikes(event: Event, item: any) {
    event.stopPropagation();
    if (item.liked) {
      item.likes--;
    } else {
      item.likes++;
    }
    item.liked = !item.liked;
  }

  increment(event: Event, item: any, quantity: number = 1) {
    event.stopPropagation();
    item.quantity += quantity;
    this.selectedItems = this.filteredItems.reduce(
      (total, currentItem) => total + currentItem.quantity,
      0
    );
  }

  decrement(event: Event, item: any) {
    event.stopPropagation();
    if (item.quantity > 0) {
      item.quantity--;
      this.selectedItems--;
    }
  }
}
