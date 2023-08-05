import { Component, Signal } from '@angular/core';
import { CartService } from './app-cart.service';
import { NgFor, NgIf } from '@angular/common';
import { Location } from '@angular/common';
import { AppVoucherComponent } from '../app-voucher/app-voucher.component';
import { CartBag } from '../interfaces';
import { PaymentformComponent } from '../paymentform/paymentform.component';

@Component({
  selector: 'app-app-cart',
  template: `
    <div>
      <div class="flex items-center justify-center">
        <h3>Cart</h3>
      </div>
      <div>
        <div class=" flex w-full  space-x-2  ...">
          <div>
            <button
              (click)="back()"
              class=" rounded-full border w-6 h-6 text-sm border-purple-600  hover:text-white hover:bg-violet-600 hover:border-transparent"
            >
              ←
            </button>
          </div>

          <button
            (click)="clear()"
            class=" rounded-full border px-4 py-1 text-sm border-red-600  hover:text-white hover:bg-red-600 hover:border-transparent"
          >
            Empty Cart
          </button>
          <div></div>
        </div>
        <div class="flex flex-row justify-between">
          <div>
            <div
              class=" flex w-full  space-y-2  ..."
              *ngFor="let cartProduct of cartProducts()"
            >
              <div>
                <span
                  >{{ cartProduct.product.name }}:
                  {{ cartProduct.quantity() }}</span
                >
                <span> Cost: {{ cartProduct.totalPrice().toFixed(2) }}€</span>
                <span
                  *ngIf="
                    cartProduct.totalPrice() !==
                    cartProduct.discountedTotalPrice()
                  "
                >
                  Discounted Cost:
                  {{ cartProduct.discountedTotalPrice().toFixed(2) }}€</span
                >
              </div>
            </div>
            <div>Total:{{ cartTotal().toFixed(2) }}€</div>

            <div *ngIf="shouldShowDiscountTotal()">
              Discounted Total: {{ discountedTotal().toFixed(2) }}
            </div>
            <div>
              <app-app-voucher></app-app-voucher>
            </div>
          </div>
          <div class="flex items-center justify-center ">
            <button
              (click)="togglePaymentForm()"
              class="px-4 py-1 text-sm border-purple-600 rounded-full border hover:text-white hover:bg-violet-600 hover:border-transparent"
            >
              Next
            </button>
          </div>

          <div *ngIf="!showPaymentForm">
            <app-paymentform></app-paymentform>
          </div>
          <div *ngIf="showPaymentForm"></div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [NgFor, NgIf, AppVoucherComponent, PaymentformComponent],
})
export class AppCartComponent {
  cartTotal: Signal<number> = this.cartService.cartTotalPrice;
  discountedTotal: Signal<number> = this.cartService.cartDiscountedTotalPrice;
  cartProducts: Signal<CartBag[]> = this.cartService.cart;
  showPaymentForm: boolean = true;

  constructor(public cartService: CartService, private location: Location) {}

  shouldShowDiscountTotal(): boolean {
    return this.cartTotal() !== this.discountedTotal() && this.cartTotal() > 0;
  }
  togglePaymentForm() {
    this.showPaymentForm = !this.showPaymentForm;
  }

  back() {
    this.location.back();
  }

  clear() {
    this.cartService.clearCart();
  }
}
