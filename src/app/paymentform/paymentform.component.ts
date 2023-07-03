import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paymentform',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<div>
      <label for="cardNumber">Card Number:</label>
      <input
        type="text"
        id="cardNumber"
        name="cardNumber"
        [(ngModel)]="cardNumber"
        required
      />
    </div>
    <div>
      <label for="expirationDate">Expiration Date:</label>
      <input
        type="text"
        id="expirationDate"
        name="expirationDate"
        [(ngModel)]="expirationDate"
        required
      />
    </div>
    <div>
      <label for="cvv">CVV:</label>
      <input type="text" id="cvv" name="cvv" [(ngModel)]="cvv" required />
    </div>
    <button (click)="submitForm()" [disabled]="!formValid()">Submit</button> `,
})
export class PaymentformComponent {
  cardNumber: string;
  expirationDate: string;
  cvv: string;

  constructor() {
    this.cardNumber = '';
    this.expirationDate = '';
    this.cvv = '';
  }
  submitForm() {
    if (this.formValid()) {
      // Perform card validation logic here
      console.log('Form submitted successfully');
    }
  }
  formValid(): boolean {
    return !!this.cardNumber && !!this.expirationDate && !!this.cvv;
  }
}
