import { provideClientHydration } from '@angular/platform-browser';
import { Product } from '../product-list/product-list.component';
import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';

export interface CartBag {
  product: Product;
  quantity: number;
  totalPrice: number;
}

@Injectable()
export class CartService {
  cart: WritableSignal<CartBag[]> = signal([]);
  cartTotalPrice: Signal<number> = computed(() =>
    this.cart().reduce((sum, cartProduct) => sum + cartProduct.totalPrice, 0)
  );
  cartTotalQuantity: Signal<number> = computed(() =>
    this.cart().reduce((sum, cartproduct) => sum + cartproduct.quantity, 0)
  );

  constructor() {}

  addToCart(product: Product) {
    this.cart.update((cartBags) => {
      const cartbag = cartBags.find(
        (cartbag) => cartbag.product.name === product.name
      );
      if (cartbag !== undefined) {
        cartbag.quantity++;
        cartbag.totalPrice = cartbag.quantity * cartbag.product.price;
      } else {
        cartBags.push({
          product: product,
          quantity: 1,
          totalPrice: product.price,
        });
      }
      return cartBags;
    });
  }

  clearCart() {
    this.cart.set([]);
  }
}
