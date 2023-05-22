import {
  Component,
  OnInit,
  Signal,
  WritableSignal,
  signal,
} from '@angular/core';
import { CartBag, CartService } from './app-cart.service';
import { NgFor, KeyValuePipe, AsyncPipe } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-app-cart',
  template: `
    <h3>Cart</h3>
    <div>
      <button (click)="back()"><--</button>
    </div>

    <div>
      <button (click)="clear()">Empty Cart</button>
    </div>

    <div *ngFor="let cartProduct of cartProducts()">
      <span>{{ cartProduct.product.name }}: {{ cartProduct.quantity }}</span>
      <span> Cost: {{ cartProduct.totalPrice.toFixed(2) }}€</span>
    </div>

    <div>Total:{{ cartTotal() }}€</div>
  `,
  standalone: true,
  imports: [NgFor, KeyValuePipe, AsyncPipe],
})
export class AppCartComponent implements OnInit {
  cartTotal: Signal<number> = this.cartService.cartTotalPrice;
  cartProducts: WritableSignal<CartBag[]> = this.cartService.cart;
  constructor(public cartService: CartService, private location: Location) {}

  back() {
    this.location.back();
  }

  clear() {
    this.cartService.clearCart();
  }

  ngOnInit(): void {}
}
