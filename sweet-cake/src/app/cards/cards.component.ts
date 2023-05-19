import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { data } from '../../data/database';
import { ProductModalComponent } from '../product-modal/product-modal.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent {
  items = data;
  modalRef: BsModalRef<any> | undefined;

  constructor(private modalService: BsModalService) {}

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

  closeModal() {
    this.modalRef?.hide();
    document.body.classList.remove('modal-open');
  }
}