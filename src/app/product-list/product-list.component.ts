import { Component, Signal } from '@angular/core';
import { CartService } from '../app-cart/app-cart.service';
import { ApiClientService } from '../../api-client.service';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { Product } from '../interfaces';

@Component({
  selector: 'app-product-list',
  template: `
    <div
      class="flex items-center justify-center w-full flex-col space-y-2  ..."
    >
      <h3>Products</h3>

      <div *ngFor="let product of products">
        <span> {{ product.name }} : {{ product.price }}€ </span>
        <button
          class="px-4 py-1 text-sm text-blue-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          type="button"
          (click)="addToCart(product)"
        >
          <span>Add to Cart</span>
        </button>
      </div>
      <div>
        <p>total: {{ totalItemsInCart() }}</p>
      </div>
    </div>
  `,
  standalone: true,
  imports: [RouterLink, NgFor],
})
export class ProductListComponent {
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

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
