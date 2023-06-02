import { Component } from '@angular/core';
import { data } from '../../data/database';

@Component({
  selector: 'app-popular-products-component',
  templateUrl: './popular-products-component.component.html',
  styleUrls: ['./popular-products-component.component.css'],
})
export class PopularProductsComponentComponent {
  popularProducts: any[] = [];
  activeIndex: number = 0;

  constructor() {
    this.popularProducts = data.sort((a, b) => b.likes - a.likes).slice(0, 3);
  }

  previousProduct() {
    this.activeIndex =
      (this.activeIndex - 1 + this.popularProducts.length) %
      this.popularProducts.length;
  }

  nextProduct() {
    this.activeIndex = (this.activeIndex + 1) % this.popularProducts.length;
  }

  getStars(count: number): any[] {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < count);
    }
    return stars;
  }
}
