import { Component, OnInit } from '@angular/core';
import { CartProduct, CartService } from './app-cart.service';
import { NgFor, KeyValuePipe } from '@angular/common';
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

    <div *ngFor="let cartProduct of cartProducts">
      <span>{{ cartProduct.product.name }}: {{ cartProduct.quantity }}</span>
      <span> Cost: {{ cartProduct.totalPrice.toFixed(2) }}€</span>
    </div>

    <div>Total:{{ cartTotal.toFixed(2) }}€</div>
  `,
  standalone: true,
  imports: [NgFor, KeyValuePipe],
})
export class AppCartComponent implements OnInit {
  cartProducts: CartProduct[] = this.cartService.items;
  cartTotal: number = this.cartService.cartTotal;

  constructor(private cartService: CartService, private location: Location) {}

  back() {
    this.location.back();
  }

  clear() {
    this.cartService.clearCart();
    this.cartProducts = this.cartService.items;
    this.cartTotal = this.cartService.cartTotal;
  }

  ngOnInit(): void {}
}
