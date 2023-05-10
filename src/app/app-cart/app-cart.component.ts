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
      <button>Empty Cart</button>
    </div>

    <div *ngFor="let cartProduct of cartProducts">
      <span>{{ cartProduct.product.name }}: {{ cartProduct.quantity }}</span>
      <span> Price: {{ cartProduct.totalPrice }} $</span>
    </div>

    <div>Total:{{ cartTotal }} $</div>
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

  ngOnInit(): void {}
}
