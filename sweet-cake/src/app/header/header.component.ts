import { CartService } from '../cart/cart.service';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { data } from 'src/data/database';
import JSConfetti from 'js-confetti';
import { SearchFieldComponent } from '../search-field/search-field.component';

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
  showSearchInput: boolean = false;
  searchText: string = '';
  searchResults: any[] = [];

  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private elementRef: ElementRef
  ) {
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
  }

  showSuccess(mensage: string, title: string) {
    this.toastr.success(`${mensage}`, `${title}`, {
      positionClass: 'toast-bottom-left',
      closeButton: true,
      timeOut: 3000,
    });
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.getHeaderOffset();
    this.checkHeaderPosition();
  }

  showConfetti(): void {
    const jsConfetti = new JSConfetti();
    const config = {
      angle: 200,
      confettiRadius: 3,
      confettiNumber: 150,
    };

    jsConfetti.addConfetti(config);
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

  hideSearchInput(): void {
    if (this.showSearchInput) {
      const searchInput = document.querySelector('.search-input');
      if (searchInput) {
        searchInput.classList.remove('active');
        setTimeout(() => {
          this.showSearchInput = false;
          this.searchText = '';
          this.searchResults = [];
        }, 300);
      }
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    const searchIcon = document.querySelector('.search-icon');
    const searchField = document.querySelector('.search-input');

    if (
      searchIcon &&
      !searchIcon.contains(clickedElement) &&
      searchField &&
      !searchField.contains(clickedElement)
    ) {
      this.hideSearchInput();
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToBottom(): void {
    const scrollHeight = document.documentElement.scrollHeight;
    window.scrollTo({ top: scrollHeight, behavior: 'smooth' });
  }

  toggleSearchInput(): void {
    const searchFieldComponent: SearchFieldComponent | any =
      document.querySelector('app-search-field');
    if (searchFieldComponent) {
      searchFieldComponent.toggleSearchInput();
    }
  }

  performSearch(query: string): void {
    const searchResults = data.filter(
      (item) =>
        item.nameItem.toLowerCase().includes(query.toLowerCase()) ||
        item.tag.toLowerCase().includes(query.toLowerCase())
    );
    if (searchResults.length === 0) {
      this.searchResults = [
        {
          id: -1,
          nameItem: 'Nenhum resultado encontrado',
          description: '',
          value: 0,
        },
      ];
    } else {
      this.searchResults = searchResults;
    }
    this.showSearchInput = true;
  }

  getTotalValue(): number {
    return this.cartItems
      .reduce((total, item) => total + item.value * item.quantity, 0)
      .toFixed(2);
  }

  finalizePurchase(): void {
    this.cartService.clearCart();
    this.showSuccess(
      'Obrigado por comprar conosco.',
      'Seu pedido foi feito com sucesso!'
    );
    this.showConfetti();
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
