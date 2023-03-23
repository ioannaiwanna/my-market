import { Component, OnInit } from '@angular/core';
import { CartService } from './app-cart.service';
import { Product } from '../product-list/product-list.component';

@Component({
  selector: 'app-app-cart',
  templateUrl: './app-cart.component.html',
  styleUrls: ['./app-cart.component.scss'],
})
export class AppCartComponent implements OnInit {
  products: Product[] = [];
  constructor(private cartService: CartService) {
    this.products = this.cartService.getItems();
  }

  ngOnInit(): void {}
}
