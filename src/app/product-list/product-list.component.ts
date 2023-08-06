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
      <div *ngFor="let product of products">
        <span> {{ product.name }} : {{ product.price }}€ </span>
        <button
          class="px-4 py-1 text-sm text-blue-600 font-semibold rounded-full border border-blue-600 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          type="button"
          (click)="addToCart(product)"
        >
          <span
            ><svg
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
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </span>
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
