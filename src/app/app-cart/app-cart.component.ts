import { Component, Signal } from '@angular/core';
import { CartService } from './app-cart.service';
import { NgFor, NgIf } from '@angular/common';
import { Location } from '@angular/common';
import { AppVoucherComponent } from '../app-voucher/app-voucher.component';
import { CartBag } from '../interfaces';
import { RouterLink } from '@angular/router';

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
      <span>{{ cartProduct.product.name }}: {{ cartProduct.quantity() }}</span>
      <span> Cost: {{ cartProduct.totalPrice().toFixed(2) }}€</span>
      <span
        *ngIf="cartProduct.totalPrice() !== cartProduct.discountedTotalPrice()"
      >
        Discounted Cost:
        {{ cartProduct.discountedTotalPrice().toFixed(2) }}€</span
      >
    </div>

    <div>Total:{{ cartTotal().toFixed(2) }}€</div>
    <div *ngIf="shouldShowDiscountTotal()">
      Discounted Total: {{ discountedTotal().toFixed(2) }}
    </div>
    <app-app-voucher></app-app-voucher>
    <button [routerLink]="['/paymentform']">Pay</button>
  `,
  standalone: true,
  imports: [NgFor, NgIf, AppVoucherComponent, RouterLink],
})
export class AppCartComponent {
  cartTotal: Signal<number> = this.cartService.cartTotalPrice;
  discountedTotal: Signal<number> = this.cartService.cartDiscountedTotalPrice;
  cartProducts: Signal<CartBag[]> = this.cartService.cart;
  constructor(public cartService: CartService, private location: Location) {}

  shouldShowDiscountTotal(): boolean {
    return this.cartTotal() !== this.discountedTotal() && this.cartTotal() > 0;
  }

  back() {
    this.location.back();
  }

  clear() {
    this.cartService.clearCart();
  }
}
