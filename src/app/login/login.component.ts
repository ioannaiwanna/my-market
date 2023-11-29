import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { NotificationMsgComponent } from '../notification-msg/notification-msg.component';
import { FormStateServiceService } from '../form-state-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterOutlet, NotificationMsgComponent],
  template: `
    <div class="container px-4 py-4">
      <div class="flex justify-center justify-items-center flex-row ">
        <form [formGroup]="loginForm">
          <div class="flex flex-col justify-center items-center space-y-2">
            <div class="flex flex-row items-center space-x-2">
              <div><label for="username">Username:</label></div>
              <div>
                <input
                  class=" form-control border border-black"
                  type="text"
                  id="username"
                  formControlName="username"
                  required
                />
              </div>

              <div
                *ngIf="
                  username?.invalid && (username?.dirty || username?.touched)
                "
                class="alert alert-danger"
              >
                <div *ngIf="username?.errors?.['required']">
                  Name is required.
                </div>
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

              <div
                *ngIf="
                  password?.invalid &&
                  (password?.dirty || password?.touched || submitAttempted)
                "
                class="alert alert-danger"
              >
                <div *ngIf="password?.errors?.['required']">
                  Password is required.
                </div>
                <div *ngIf="password?.errors?.['minlength']">
                  Password must be at least 4 characters long.
                </div>
              </div>
            </div>

            <div
              class=" px-4 py-1 border rounded-full border-green-600 text-sm text-green-600  hover:text-white hover:bg-green-600 hover:border-transparent"
            >
              <button
                type="submit"
                (click)="onSubmit()"
                [disabled]="!loginForm.valid"
              >
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
  submitAttempted = false;

  constructor(
    private router: Router,
    private formStateService: FormStateServiceService
  ) {}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
    this.loginForm.statusChanges.subscribe((status) => {
      this.formStateService.setFromValidity(status === 'VALID');
    });
  }
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    this.router.navigate(['/home']);
  }
}
