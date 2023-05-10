import { Product } from '../product-list/product-list.component';
import { Injectable } from '@angular/core';

export interface CartProduct {
  product: Product;
  quantity: number;
  totalPrice: number;
}

@Injectable()
export class CartService {
  items: CartProduct[] = [];
  cartTotal: number = 0;

  constructor() {}

  addToCart(product: Product) {
    const cartProduct = this.items.find(
      (cartProduct) => cartProduct.product.name === product.name
    );
    if (cartProduct) {
      cartProduct.quantity++;
      cartProduct.totalPrice = cartProduct.quantity * cartProduct.product.price;
    } else {
      this.items = [
        ...this.items,
        { product: product, quantity: 1, totalPrice: product.price },
      ];
    }
    this.cartTotal += product.price;
  }

  clearCart() {
    this.items = [];
  }
}
