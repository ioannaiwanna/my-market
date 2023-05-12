import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from '../product-list/product-list.component';
import { Injectable } from '@angular/core';

export interface CartProduct {
  product: Product;
  quantity: number;
  totalPrice: number;
}

@Injectable()
export class CartService {
  cartProductsSubject = new BehaviorSubject<CartProduct[]>([]);
  cartProducts$: Observable<CartProduct[]> =
    this.cartProductsSubject.asObservable();
  cartTotalPrice$: Observable<number> = this.cartProducts$.pipe(
    map((cartProducts: CartProduct[]) =>
      cartProducts.reduce((sum, cartProduct) => sum + cartProduct.totalPrice, 0)
    )
  );
  cartTotalQuantity$: Observable<number> = this.cartProducts$.pipe(
    map((cartProducts: CartProduct[]) =>
      cartProducts.reduce((sum, cartproduct) => sum + cartproduct.quantity, 0)
    )
  );

  constructor() {}

  addToCart(product: Product) {
    const cartProducts = this.cartProductsSubject.getValue();
    const cartProduct = cartProducts.find(
      (cartProduct) => cartProduct.product.name === product.name
    );

    if (cartProduct) {
      cartProduct.quantity++;
      cartProduct.totalPrice = cartProduct.quantity * cartProduct.product.price;
    } else {
      cartProducts.push({
        product: product,
        quantity: 1,
        totalPrice: product.price,
      });
    }
    this.cartProductsSubject.next(cartProducts);
  }

  clearCart() {
    this.cartProductsSubject.next([]);
  }
}
