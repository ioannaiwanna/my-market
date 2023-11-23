import { Signal, WritableSignal } from '@angular/core';

export interface Product {
  name: string;
  size: string;
  price: number;
}

export interface Voucher {
  name: string;
  discountPercent: number;
  appliesOn: Array<string>;
}

export interface CartBag {
  product: Product;
  quantity: WritableSignal<number>;
  totalPrice: Signal<number>;
  discountedTotalPrice: Signal<number>;
}
export interface User {
  username: string;
  password: string;
}
