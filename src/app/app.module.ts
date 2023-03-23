import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AppCartComponent } from './app-cart/app-cart.component';
import { HomeComponent } from './home/home.component';
import { CartService } from './app-cart/app-cart.service';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    ProductListComponent,
    AppCartComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [CartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
