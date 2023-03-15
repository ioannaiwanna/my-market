import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AppCartComponent } from './app-cart/app-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    ProductListComponent,
    AppCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
