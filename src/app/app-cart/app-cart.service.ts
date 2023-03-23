import { Product } from '../product-list/product-list.component';
import { Injectable } from '@angular/core';

@Injectable()
export class CartService {
  items: Product[] = [];

  constructor() {}

  addToCart(product: Product) {
    this.items.push(product);
  }
  getItems(): Product[] {
    return this.items;
  }
  clearCart() {
    this.items = [];
    return this.items;
  }
}
