import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: ` <app-product-list></app-product-list> `,
  imports: [CommonModule, ProductListComponent],
})
export class HomeComponent {}
