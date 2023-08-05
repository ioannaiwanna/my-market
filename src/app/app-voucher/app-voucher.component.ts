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
    <div class="flex flex-row space-x-2 ...">
      <div>Enter your voucher here!</div>
      <div><input #box class="border border-black" /></div>
    </div>
    <div>
      <button
        (click)="onClick(box.value)"
        class="px-4 py-1 text-sm border-purple-600 rounded-full border hover:text-white hover:bg-violet-600 hover:border-transparent"
      >
        Apply
      </button>
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
