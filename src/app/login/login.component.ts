import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `<form [formGroup]="loginForm" (ngSubmit)="login()">
    <div>
      <label for="username">Username:</label>
      <input type="test" id="username" formControlName="username" ] />
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="test" id="password" formControlName="password" ] />
    </div>
  </form>`,
})
export class LoginComponent {
  loginForm!: FormGroup;
  login() {}
}
