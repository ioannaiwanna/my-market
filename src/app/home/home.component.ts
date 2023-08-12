import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ProductListComponent],
  template: `<app-header></app-header>
    <app-product-list></app-product-list> `,
})
export class HomeComponent {}
