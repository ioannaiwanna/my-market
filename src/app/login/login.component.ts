import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterOutlet],
  template: `
    <div class="container px-4 py-4">
      <div class="flex justify-center justify-items-center flex-row ">
        <div>
          <div
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
          </div>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="flex flex-col justify-center items-center space-y-2">
            <div class="flex flex-row items-center space-x-2">
              <div><label for="username">Username:</label></div>
              <div>
                <input
                  class="border border-black"
                  type="text"
                  id="username"
                  formControlName="username"
                  required
                />
              </div>

              <div>
                <span
                  *ngIf="
                    this.loginForm.controls['username'].dirty && usernameValid()
                  "
                  class="text-green-600"
                  >✓</span
                >
                <span
                  *ngIf="
                    this.loginForm.controls['username'].dirty &&
                    !usernameValid()
                  "
                  class="text-red-600"
                  >❌</span
                >
              </div>
            </div>
            <div class="flex flex-row items-center space-x-2">
              <label for="password">Password:</label>
              <input
                class="border border-black"
                type="text"
                id="password"
                formControlName="password"
                required
              />

              <div class="flex justify">
                <span
                  *ngIf="
                    this.loginForm.controls['password'].dirty && passwordValid()
                  "
                  class="text-green-600"
                  >✓</span
                >
                <span
                  *ngIf="
                    this.loginForm.controls['password'].dirty &&
                    !passwordValid()
                  "
                  class="text-red-600"
                  >❌</span
                >
              </div>
            </div>

            <div
              class=" px-4 py-1 border rounded-full border-green-600 text-sm text-green-600  hover:text-white hover:bg-green-600 hover:border-transparent"
            >
              <button (click)="onSubmit()" [disabled]="!loginValid()">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showOutlet: boolean = true;
  constructor(private router: Router, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [Validators.required, Validators.pattern('^((?:[A-Za-z]+ ?){1,3})')],
      ],
      password: ['', [Validators.required, Validators.pattern('[0-9]{3,4}')]],
    });
  }
  onSubmit() {
    if (this.loginValid()) {
      this.router.navigate(['/home']);
    }
  }
  usernameValid(): boolean {
    return this.loginForm.controls['username'].status === 'VALID';
  }
  passwordValid(): boolean {
    return this.loginForm.controls['password'].status === 'VALID';
  }
  loginValid(): boolean {
    return this.loginForm.status === 'VALID';
  }
}
