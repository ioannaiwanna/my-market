import { Component, OnInit, Signal } from '@angular/core';
import { CartService } from '../app-cart/app-cart.service';
import { ApiClientService } from '../../api-client.service';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { Product } from '../interfaces';

@Component({
  selector: 'app-product-list',
  template: `
    <button [routerLink]="['/checkout']">View your cart</button>

    <h3>Products</h3>

    <div *ngFor="let product of products">
      <span> {{ product.name }} : {{ product.price }}€ </span>
      <button type="button" (click)="addToCart(product)">
        <span>Add to Cart</span>
      </button>
    </div>
    <div>
      <p>total: {{ totalItemsInCart() }}</p>
    </div>
  `,
  standalone: true,
  imports: [RouterLink, NgFor],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  totalItemsInCart: Signal<number> = this.cartService.cartTotalQuantity;

  constructor(
    private cartService: CartService,
    private apiClient: ApiClientService
  ) {
    this.apiClient.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  ngOnInit(): void {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
