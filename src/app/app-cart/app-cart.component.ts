import { Component, OnInit } from '@angular/core';
import { CartProduct, CartService } from './app-cart.service';
import { NgFor, KeyValuePipe, AsyncPipe } from '@angular/common';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

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

    <div *ngFor="let cartProduct of cartProducts$ | async">
      <span>{{ cartProduct.product.name }}: {{ cartProduct.quantity }}</span>
      <span> Cost: {{ cartProduct.totalPrice.toFixed(2) }}€</span>
    </div>

    <div>Total:{{ cartTotal$ | async }}€</div>
  `,
  standalone: true,
  imports: [NgFor, KeyValuePipe, AsyncPipe],
})
export class AppCartComponent implements OnInit {
  cartTotal$: Observable<number> = this.cartService.cartTotalPrice$;
  cartProducts$: Observable<CartProduct[]> = this.cartService.cartProducts$;

  constructor(private cartService: CartService, private location: Location) {}

  back() {
    this.location.back();
  }

  clear() {
    this.cartService.clearCart();
  }

  ngOnInit(): void {}
}
