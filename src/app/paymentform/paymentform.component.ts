import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotificationMsgComponent } from '../notification-msg/notification-msg.component';

@Component({
  selector: 'app-paymentform',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NotificationMsgComponent],
  template: `<form [formGroup]="cardForm" (ngSubmit)="submitForm()">
    <div class="flex flex-col space-y-2 ...">
      <div class="flex flex-row items-center space-x-2">
        <label for="cardNumber">Card Number</label>
        <input
          class="border border-black"
          type="text"
          id="cardNumber"
          formControlName="cardNumber"
          required
        />
        <div class="flex justify-center"></div>
        <span
          *ngIf="
            this.cardForm.controls['cardNumber'].dirty && cardNumberValid()
          "
          class="text-green-600"
          >✓</span
        >
        <span
          *ngIf="
            this.cardForm.controls['cardNumber'].dirty && !cardNumberValid()
          "
          class="text-red-600"
          >❌</span
        >
      </div>
      <div class="flex flex-row items-center space-x-2">
        <label for="cardName">Card Name</label>
        <input
          class="border border-black"
          type="text"
          id="cardName"
          formControlName="cardName"
          required
        />
        <div class="flex justify-center">
          <span
            *ngIf="this.cardForm.controls['cardName'].dirty && cardNameValid()"
            class="text-green-600"
            >✓</span
          >
          <span
            *ngIf="this.cardForm.controls['cardName'].dirty && !cardNameValid()"
            class="text-red-600"
            >❌</span
          >
        </div>
      </div>
      <div class="flex flex-row items-center space-x-2">
        <label for="expirationDate">Expiration Date</label>
        <input
          class="border border-black"
          type="text"
          id="expirationDate"
          formControlName="expirationDate"
          required
        />
        <div class="flex justify-center">
          <span
            *ngIf="
              this.cardForm.controls['expirationDate'].dirty &&
              expirationDateValid()
            "
            class="text-green-600"
            >✓</span
          >
          <span
            *ngIf="
              this.cardForm.controls['expirationDate'].dirty &&
              !expirationDateValid()
            "
            class="text-red-600"
            >❌</span
          >
        </div>
      </div>
      <div class="flex flex-row items-center space-x-2">
        <label for="cvv">CVV</label>
        <input
          class="border border-black"
          type="text"
          id="cvv"
          formControlName="cvv"
          required
        />
        <div class="flex justify-center">
          <span
            *ngIf="this.cardForm.controls['cvv'].dirty && cvvValid()"
            class="text-green-600"
            >✓</span
          >
          <span
            *ngIf="this.cardForm.controls['cvv'].dirty && !cvvValid()"
            class="text-red-600"
            >❌</span
          >
        </div>
      </div>
      <div>
        <button
          (click)="submitForm()"
          [disabled]="!formValid()"
          class="px-4 py-1 text-sm text-purple-600 border-purple-600 rounded-full border hover:text-white hover:bg-violet-600 hover:border-transparent"
        >
          Pay
        </button>
      </div>
      <app-notification-msg
        *ngIf="showNotification"
        [message]="notificationMessage"
        (close)="closeNotification()"
      ></app-notification-msg>
    </div>
  </form>`,
})
export class PaymentformComponent implements OnInit {
  cardForm!: FormGroup;
  showNotification = false;
  notificationMessage = '';

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.cardForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
      cardName: [
        '',
        [Validators.required, Validators.pattern('^((?:[A-Za-z]+ ?){1,3})')],
      ],
      expirationDate: [
        '',
        [
          Validators.required,
          Validators.pattern('^(0[1-9]|1[0-2])/?([0-9]{4}|[0-9]{2})$'),
        ],
      ],
      cvv: ['', [Validators.required, Validators.pattern('[0-9]{3,4}')]],
    });
  }
  submitForm() {
    if (this.formValid()) {
      this.openNotification('GOODBYE');
    }
  }
  cardNumberValid(): boolean {
    return this.cardForm.controls['cardNumber'].status === 'VALID';
  }
  cardNameValid(): boolean {
    return this.cardForm.controls['cardName'].status === 'VALID';
  }
  expirationDateValid(): boolean {
    return this.cardForm.controls['expirationDate'].status === 'VALID';
  }
  cvvValid(): boolean {
    return this.cardForm.controls['cvv'].status === 'VALID';
  }
  formValid(): boolean {
    return this.cardForm.status === 'VALID';
  }
  openNotification(message: string) {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.closeNotification();
    }, 5000);
  }
  closeNotification() {
    this.showNotification = false;
    this.notificationMessage = '';
  }
}
