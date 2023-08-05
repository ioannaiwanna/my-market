import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// import { TrimFormControl } from '../shared/TrimFormControl';

@Component({
  selector: 'app-paymentform',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `<form [formGroup]="cardForm" (ngSubmit)="submitForm()">
    <div class="flex flex-col space-y-2  ...">
      <div>
        <label for="cardNumber">Card Number:</label>
        <input
          class="border border-black"
          type="text"
          id="cardNumber"
          formControlName="cardNumber"
          required
        />
        <span
          *ngIf="
            this.cardForm.controls['cardNumber'].dirty && cardNumberValid()
          "
          >✓</span
        >
        <span
          *ngIf="
            this.cardForm.controls['cardNumber'].dirty && !cardNumberValid()
          "
          >❌!</span
        >
      </div>
      <div>
        <label for="cardName">Card Name:</label>
        <input
          class="border border-black"
          type="text"
          id="cardName"
          formControlName="cardName"
          required
        />
        <span
          *ngIf="this.cardForm.controls['cardName'].dirty && cardNameValid()"
          >✓</span
        >
        <span
          *ngIf="this.cardForm.controls['cardName'].dirty && !cardNameValid()"
          >❌!</span
        >
      </div>
      <div>
        <label for="expirationDate">Expiration Date:</label>
        <input
          class="border border-black"
          type="text"
          id="expirationDate"
          formControlName="expirationDate"
          required
        />
        <span
          *ngIf="
            this.cardForm.controls['expirationDate'].dirty &&
            expirationDateValid()
          "
          >✓</span
        >
        <span
          *ngIf="
            this.cardForm.controls['expirationDate'].dirty &&
            !expirationDateValid()
          "
          >❌!</span
        >
      </div>
      <div>
        <label for="cvv">CVV:</label>
        <input
          class="border border-black"
          type="text"
          id="cvv"
          formControlName="cvv"
          required
        />
        <span *ngIf="this.cardForm.controls['cvv'].dirty && cvvValid()">✓</span>
        <span *ngIf="this.cardForm.controls['cvv'].dirty && !cvvValid()"
          >❌!</span
        >
      </div>
      <div>
        <button
          (click)="submitForm()"
          [disabled]="!formValid()"
          class="px-4 py-1 text-sm border-purple-600 rounded-full border hover:text-white hover:bg-violet-600 hover:border-transparent"
        >
          Pay
        </button>
      </div>
    </div>
  </form>`,
})
export class PaymentformComponent implements OnInit {
  cardForm!: FormGroup;

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
    // this.cardForm.addControl('', TrimFormControl);
  }
  submitForm() {
    if (this.formValid()) {
      // Perform card validation logic here
      console.log('Form submitted successfully');
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
}
