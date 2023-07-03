import { Component, Signal, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../app-cart/app-cart.service';
import { ApiClientService } from 'src/api-client.service';
import { Voucher } from '../interfaces';

@Component({
  selector: 'app-app-voucher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      Enter your voucher here!
      <input #box />
      <button (click)="onClick(box.value)">Apply</button>
      <!-- <p>{{ value()?.name }}</p> -->
    </div>
  `,
})
export class AppVoucherComponent {
  value: Signal<Voucher | undefined> = this.cartService.selectedVoucher;
  vouchers: Voucher[] = [];

  constructor(
    private cartService: CartService,
    private apiClient: ApiClientService
  ) {
    this.apiClient.getVouchers().subscribe((vouchers) => {
      this.vouchers = vouchers;
    });
  }

  onClick(voucherName: string) {
    const voucher = this.vouchers.find(
      (voucher) => voucher.name === voucherName
    );
    if (voucher) this.cartService.setSelectedVoucher(voucher);
  }
}
