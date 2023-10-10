import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { NotificationMsgComponent } from '../notification-msg/notification-msg.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterOutlet, NotificationMsgComponent],
  template: `
    <div class="container px-4 py-4">
      <div class="flex justify-center justify-items-center flex-row ">
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
                  *ngIf="this.loginForm.controls['username'].dirty"
                  class="text-green-600"
                  >✓</span
                >
                <span
                  *ngIf="this.loginForm.controls['username'].dirty"
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
                  *ngIf="this.loginForm.controls['password'].dirty"
                  class="text-green-600"
                  >✓</span
                >
                <span
                  *ngIf="this.loginForm.controls['password'].dirty"
                  class="text-red-600"
                  >❌</span
                >
              </div>
            </div>

            <div
              class=" px-4 py-1 border rounded-full border-green-600 text-sm text-green-600  hover:text-white hover:bg-green-600 hover:border-transparent"
            >
              <button (click)="onSubmit()">Login</button>
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

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [Validators.required, Validators.pattern('^((?:[A-Za-z]+ ?){1,3})')],
      ],
      password: ['', [Validators.required, Validators.pattern('[0-9]{3,4}')]],
    });
  }
  onSubmit(): void {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    console.log(username, password);

    if (this.authService.login(username, password)) {
      this.router.navigate(['/home']);
    } else {
      console.log('nonononono');
    }

    // if (this.loginValid()) {
    //   this.router.navigate(['/home']);
    // }
  }
  // usernameValid(): boolean {
  //   return this.loginForm.controls['username'].status === 'VALID';
  // }
  // passwordValid(): boolean {
  //   return this.loginForm.controls['password'].status === 'VALID';
  // }
  // loginValid(): boolean {
  //   return this.loginForm.status === 'VALID';
  // }
}
