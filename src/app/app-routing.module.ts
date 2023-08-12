import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppCartComponent } from './app-cart/app-cart.component';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'productlist', component: ProductListComponent },
  { path: 'checkout', component: AppCartComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
