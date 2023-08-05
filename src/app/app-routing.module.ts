import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppCartComponent } from './app-cart/app-cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'checkout', component: AppCartComponent },
  { path: 'productlist', component: ProductListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
