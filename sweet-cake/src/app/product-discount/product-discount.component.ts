import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { data } from '../../data/database';

@Component({
  selector: 'app-product-discount',
  templateUrl: './product-discount.component.html',
  styleUrls: ['./product-discount.component.css'],
})
export class ProductDiscountComponent implements OnInit {
  productImg: string | undefined;
  discountedProduct: any;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sortDiscountedProduct();
  }

  sortDiscountedProduct() {
    const randomIndex = Math.floor(Math.random() * data.length);
    const selectedProduct = data[randomIndex];

    const discountValue = selectedProduct.value * 0.4;

    const discountedProduct = {
      ...selectedProduct,
      value: discountValue.toFixed(2),
    };
    this.sharedService.discountedProduct = discountedProduct;
    this.discountedProduct = discountedProduct;

    this.productImg = discountedProduct.img;
  }
}
