import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularProductsComponentComponent } from './popular-products-component.component';

describe('PopularProductsComponentComponent', () => {
  let component: PopularProductsComponentComponent;
  let fixture: ComponentFixture<PopularProductsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopularProductsComponentComponent]
    });
    fixture = TestBed.createComponent(PopularProductsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
