import { Component, OnInit } from '@angular/core';
import { CartService } from './app-cart.service';
import { Product } from '../product-list/product-list.component';

@Component({
  selector: 'app-app-cart',
  templateUrl: './app-cart.component.html',
  styleUrls: ['./app-cart.component.scss'],
})
export class AppCartComponent implements OnInit {
  products: Product[];
  productsPerName: Record<string, Product[]>;

  constructor(private cartService: CartService) {
    this.products = this.cartService.getItems();
    this.productsPerName = this.products.reduce((grouped, item) => {
      // initialize array if its the first product witht his name
      if (!grouped[item.name]) {
        grouped[item.name] = [] as Product[];
      }
      // add product to array
      grouped[item.name].push(item);
      return grouped;
    }, {} as Record<string, Product[]>);
  }

  ngOnInit(): void {}
}
