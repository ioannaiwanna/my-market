import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-home',
  template: `<app-product-list></app-product-list>`,
  standalone: true,
  imports: [ProductListComponent],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
