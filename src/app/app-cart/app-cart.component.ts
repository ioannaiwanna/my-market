import { Component, Signal } from '@angular/core';
import { CartService } from './app-cart.service';
import { CurrencyPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { CartBag } from '../interfaces';
import { PaymentformComponent } from '../paymentform/paymentform.component';
import { AppVoucherComponent } from '../app-voucher/app-voucher.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-cart',
  template: `
    <div class="flex flex-col justify-center items-center space-y-2  w-full">
      <div>
        <button
          (click)="clear()"
          class=" rounded-full border px-4 py-1 text-sm text-red-600 border-red-600  hover:text-white hover:bg-red-600 hover:border-transparent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
      <div class="flex flex-col space-y-2">
        <div
          class=" flex w-full  space-y-2  ..."
          *ngFor="let cartProduct of cartProducts()"
        >
          <div>
            <span
              >{{ cartProduct.product.name }}:
              {{ cartProduct.quantity() }}</span
            >
            <span>
              Cost:
              {{
                cartProduct.totalPrice() | number | currency : currentCurrency
              }}</span
            >

            <span
              *ngIf="
                cartProduct.totalPrice() !== cartProduct.discountedTotalPrice()
              "
            >
              Discounted Cost:
              {{
                cartProduct.discountedTotalPrice()
                  | number
                  | currency : currentCurrency
              }}</span
            >
          </div>
        </div>
        <div>Total:{{ cartTotal() | number | currency : currentCurrency }}</div>

        <div *ngIf="shouldShowDiscountTotal()">
          Discounted Total:
          {{ discountedTotal() | number | currency : currentCurrency }}
        </div>
      </div>
      <div *ngIf="showVoucher">
        <app-app-voucher></app-app-voucher>
      </div>
      <div *ngIf="!showVoucher"></div>
    </div>

    <div class="flex items-center justify-center pt-2 ">
      <div>
        <button
          (click)="executeFunctions()"
          [class.hidden]="buttonHidden"
          class="px-4 py-1 text-sm border-purple-600 rounded-full border text-purple-600 hover:text-white hover:bg-violet-600 hover:border-transparent"
        >
          Payment details
        </button>
      </div>

      <div *ngIf="!showPaymentForm">
        <app-paymentform></app-paymentform>
      </div>
      <div *ngIf="showPaymentForm"></div>
    </div>
  `,
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    PaymentformComponent,
    AppVoucherComponent,
    DecimalPipe,
    CurrencyPipe,
  ],
})
export class AppCartComponent {
  cartTotal: Signal<number> = this.cartService.cartTotalPrice;
  discountedTotal: Signal<number> = this.cartService.cartDiscountedTotalPrice;
  cartProducts: Signal<CartBag[]> = this.cartService.cart;
  showPaymentForm: boolean = true;
  showVoucher: boolean = true;
  buttonHidden: boolean = false;
  currentCurrency: string = 'EUR';

  constructor(public cartService: CartService, private route: Router) {}

  shouldShowDiscountTotal(): boolean {
    return this.cartTotal() !== this.discountedTotal() && this.cartTotal() > 0;
  }
  executeFunctions() {
    this.togglePaymentForm();
    this.hidebutton();
    this.toggleVoucher();
  }
  togglePaymentForm() {
    this.showPaymentForm = !this.showPaymentForm;
  }
  hidebutton() {
    this.buttonHidden = true;
  }
  toggleVoucher() {
    this.showVoucher = !this.showVoucher;
  }

  clear() {
    this.cartService.clearCart();
  }
}
