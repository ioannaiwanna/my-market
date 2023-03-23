import { Component, OnInit } from '@angular/core';
import { CartService } from '../app-cart/app-cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productCatalogues: ProductCatalogue[] = [];
  constructor(private route: ActivatedRoute, private cartService: CartService) {
    this.productCatalogues = [
      new ProductCatalogue(new Product('Apples', 'XL'), 3),
      new ProductCatalogue(new Product('Oranges', 'XL'), 30),
      new ProductCatalogue(new Product('Bananas', 'XL'), 4),
    ];
  }

  ngOnInit(): void {}

  addToCart(productCatalogue: ProductCatalogue) {
    console.log('product selected', productCatalogue.product);
    this.cartService.addToCart(productCatalogue.product);
    productCatalogue.reduceQuantity();
  }
}

export class ProductCatalogue {
  product: Product;
  quantity: number;
  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }

  reduceQuantity() {
    if (this.quantity !== 1) {
      this.quantity--;
      console.log('New qunatity of %s is %d', this.product.name, this.quantity);
    }
  }
}

export class Product {
  name: string;
  size: string;
  constructor(name: string, size: string) {
    this.name = name;
    this.size = size;
  }
}
