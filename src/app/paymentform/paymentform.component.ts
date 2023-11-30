import { NgIf, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotificationMsgComponent } from '../notification-msg/notification-msg.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paymentform',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NotificationMsgComponent],
  template: `
    <form [formGroup]="cardForm">
      <div class="flex flex-col items-center space-y-2">
        <div class="flex flex-row items-center space-x-2">
          <div class="flex flex-row justify-items-center space-x-2">
            <label for="cardNumber">Card Number</label>
            <input
              class="border border-black"
              type="text"
              id="cardNumber"
              formControlName="cardNumber"
              required
            />
          </div>
          <div
            *ngIf="
              cardNumber?.invalid && (cardNumber?.dirty || cardNumber?.touched)
            "
            class="alert alert-danger"
          >
            <div *ngIf="cardNumber?.errors?.['required']">
              Card number is required.
            </div>
          </div>
        </div>
        <div class="flex flex-row items-center space-x-2">
          <div class="flex flex-row items-center space-x-2">
            <label for="cardName">Card Name</label>
            <input
              class="border border-black"
              type="text"
              id="cardName"
              formControlName="cardName"
              required
            />
          </div>

          <div
            *ngIf="cardName?.invalid && (cardName?.dirty || cardName?.touched)"
            class="alert alert-danger"
          >
            <div *ngIf="cardName?.errors?.['required']">
              Card name is required.
            </div>
          </div>
        </div>
        <div class="flex flex-row items-center space-x-2">
          <div class="flex flex-row items-center space-x-2">
            <label for="expirationDate">Expiration Date</label>
            <input
              class="border border-black"
              type="text"
              id="expirationDate"
              formControlName="expirationDate"
              required
            />
          </div>
          <div
            *ngIf="
              expirationDate?.invalid &&
              (expirationDate?.dirty || expirationDate?.touched)
            "
            class="alert alert-danger"
          >
            <div *ngIf="expirationDate?.errors?.['required']">
              Expiration date is required.
            </div>
          </div>
        </div>
        <div class="flex flex-row items-center space-x-2">
          <div class="flex flex-row items-center space-x-2">
            <label for="cvv">CVV</label>
            <input
              class="border border-black"
              type="text"
              id="cvv"
              formControlName="cvv"
              required
            />
          </div>

          <div
            *ngIf="cvv?.invalid && (cvv?.dirty || cvv?.touched)"
            class="alert alert-danger"
          >
            <div *ngIf="cvv?.errors?.['required']">CVV is required.</div>
          </div>
        </div>

        <div
          class="px-4 py-1 text-sm text-purple-600 border-purple-600 rounded-full border hover:text-white hover:bg-violet-600 hover:border-transparent"
        >
          <button type="submit" (click)="onSubmit()">Proceed to payment</button>
        </div>
      </div>
    </form>
  `,
})
export class PaymentformComponent implements OnInit {
  cardForm!: FormGroup;

  constructor(private route: Router, private location: Location) {}
  ngOnInit(): void {
    this.cardForm = new FormGroup({
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{16}'),
      ]),
      cardName: new FormControl('', [
        Validators.required,
        Validators.pattern('^((?:[A-Za-z]+ ?){1,3})'),
      ]),
      expirationDate: new FormControl('', [
        Validators.required,
        Validators.pattern('^(0[1-9]|1[0-2])/?([0-9]{4}|[0-9]{2})$'),
      ]),
      cvv: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{3,4}'),
      ]),
    });
  }
  get cardNumber() {
    return this.cardForm.get('cardNumber');
  }
  get cardName() {
    return this.cardForm.get('cardName');
  }
  get expirationDate() {
    return this.cardForm.get('expirationDate');
  }
  get cvv() {
    return this.cardForm.get('cvv');
  }

  onSubmit(): void {
    console.log('clicked');
    if (this.cardForm.valid) {
      this.route.navigate(['/notification'], {
        queryParams: { message: 'GOOD BYEEEEEEE!' },
      });
    }
  }
}
