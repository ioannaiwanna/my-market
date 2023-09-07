import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="!isLoginPage">
      <header class="p-4 sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
        <app-header></app-header>
      </header>
    </ng-container>
    <main class="container mx-auto p-4">
      <router-outlet></router-outlet>
    </main>
  `,
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NgIf],
})
export class AppComponent {
  title = 'myMarket';
  isLoginPage: boolean = false;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url.includes('/login');
      }
    });
  }
}
