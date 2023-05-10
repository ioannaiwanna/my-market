import { Component, OnInit } from '@angular/core';
import { CartService } from './app-cart.service';
import { Product } from '../product-list/product-list.component';
import { NgFor, KeyValuePipe } from '@angular/common';
import { Location } from '@angular/common';

export interface CartProduct {
  product: Product;
  quantity: number;
  totalPrice: number;
}

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
  cartProducts: CartProduct[];
  cartTotal: number;

  constructor(private cartService: CartService, private location: Location) {
    this.cartProducts = Object.values(
      this.cartService.getItems().reduce((acc, product) => {
        if (acc[product.name]) {
          acc[product.name].quantity++;
          acc[product.name].totalPrice =
            product.price * acc[product.name].quantity;
        } else {
          acc[product.name] = {
            product: product,
            quantity: 1,
            totalPrice: product.price,
          };
        }
        return acc;
      }, {} as Record<string, CartProduct>)
    );
    this.cartTotal = this.cartProducts.reduce(
      (total, cur) => total + cur.totalPrice,
      0
    );
  }
  back() {
    this.location.back();
  }

  ngOnInit(): void {}
}
