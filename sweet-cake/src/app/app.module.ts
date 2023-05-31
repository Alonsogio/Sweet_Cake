import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrModule } from 'ngx-toastr';
import 'slick-carousel/slick/slick';

import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { HeaderComponent } from './header/header.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { PopularProductsComponentComponent } from './popular-products-component/popular-products-component.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { ProductDiscountComponent } from './product-discount/product-discount.component';

import { CartService } from './cart/cart.service';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    HeaderComponent,
    CarouselComponent,
    ProductModalComponent,
    PopularProductsComponentComponent,
    SobreNosComponent,
    ProductDiscountComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    FontAwesomeModule,
    SlickCarouselModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  providers: [ProductDiscountComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getCartItems();
  }
}
