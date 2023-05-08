import { Component, OnInit } from '@angular/core';
import { CartService } from '../app-cart/app-cart.service';
import { ApiClientService } from './api-client.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

export interface Product {
  name: string;
  size: string;
  price: number;
}

export interface ProductCatalogue {
  product: Product;
  quantity: number;
}

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    standalone: true,
    imports: [RouterLink, NgFor],
})
export class ProductListComponent implements OnInit {
  productCatalogues: ProductCatalogue[] = [];
  totalItemsInCart: number = this.cartService.getItems().length;
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private apiClient: ApiClientService
  ) {
    // https://fc2f5925-e428-4180-bb23-1a0b64485b9f.mock.pstmn.io/products
    // response: [{"product":{"name":"Apples","size":"XL","price":2.45},"quantity":3},{"product":{"name":"Oranges","size":"XL","price":5},"quantity":30},{"product":{"name":"Bananas","size":"XL","price":3},"quantity":4}]
    this.apiClient.getProducts().subscribe((productCatalogues) => {
      this.productCatalogues = productCatalogues;
    });
  }

  ngOnInit(): void {}

  addToCart(productCatalogue: ProductCatalogue) {
    console.log('product selected', productCatalogue.product);
    this.cartService.addToCart(productCatalogue.product);
    this.reduceQuantity(productCatalogue);
    this.totalItemsInCart = this.cartService.getItems().length;
  }

  reduceQuantity(productCatalogue: ProductCatalogue): void {
    if (productCatalogue.quantity !== 1) {
      productCatalogue.quantity--;
      console.log(
        'New qunatity of %s is %d',
        productCatalogue.product.name,
        productCatalogue.quantity
      );
    }
  }
}
