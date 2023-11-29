import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormStateServiceService } from '../form-state-service.service';

@Component({
  selector: 'app-header',
  template: `<div class="flex flex-row justify-between mb-2 ">
    <button
      (click)="navigate('/home')"
      class="flex space-x-2 px-4 py-1 text-sm font-semibold text-green-600 rounded-full border border-green-600  hover:text-white hover:bg-green-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 mr-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
        />
      </svg>
      <h2>MY MARKET</h2>
    </button>
    <div class="flex justify-center items-center">
      <button
        (click)="navigate('/checkout')"
        class="px-4 py-1 text-sm text-purple-600 font-semibold border-purple-600 rounded-full border hover:text-white hover:bg-violet-600 hover:border-transparent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </button>
    </div>
  </div> `,
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class HeaderComponent implements OnInit {
  isFormValid: boolean = false;
  constructor(
    private route: Router,
    private formStateService: FormStateServiceService
  ) {}
  ngOnInit(): void {
    this.formStateService.formValid$.subscribe((isValid) => {
      this.isFormValid = isValid;
    });
  }
  navigate(path: string) {
    if (this.isFormValid) {
      this.route.navigate([path]);
    } else {
      alert('form not valid');
    }
  }
}
