import { CartBag, Product, Voucher } from '../interfaces';
import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';

@Injectable()
export class CartService {
  private _selectedVoucher: WritableSignal<Voucher | undefined> =
    signal(undefined);
  selectedVoucher: Signal<Voucher | undefined> = computed(
    this._selectedVoucher
  );
  private _cart: WritableSignal<CartBag[]> = signal([]);
  cart: Signal<CartBag[]> = computed(this._cart);
  cartTotalPrice: Signal<number> = computed(() =>
    this._cart().reduce((sum, cartProduct) => sum + cartProduct.totalPrice(), 0)
  );
  cartTotalQuantity: Signal<number> = computed(() =>
    this._cart().reduce((sum, cartproduct) => sum + cartproduct.quantity(), 0)
  );
  cartDiscountedTotalPrice: Signal<number> = computed(() =>
    this._cart().reduce(
      (sum, cartproduct) => sum + cartproduct.discountedTotalPrice(),
      0
    )
  );

  addToCart(product: Product) {
    this._cart.update((cartBags) => {
      const cartbag = cartBags.find(
        (cartbag) => cartbag.product.name === product.name
      );
      if (cartbag) {
        cartbag.quantity.update((oldQuantity) => (oldQuantity += 1));
      } else {
        cartBags.push(this.createNewCartBag(product));
      }
      return cartBags;
    });
  }

  setSelectedVoucher(voucher: Voucher) {
    this._selectedVoucher.set(voucher);
  }

  clearCart() {
    this._cart.set([]);
    this._selectedVoucher.set(undefined);
  }

  private createNewCartBag(product: Product): CartBag {
    const quantity: WritableSignal<number> = signal(1);
    const totalPrice: Signal<number> = computed(
      () => product.price * quantity()
    );
    const discountedTotalPrice: Signal<number> = computed(() => {
      if (
        this.selectedVoucher()?.appliesOn.includes(product.name.toUpperCase())
      ) {
        return (
          totalPrice() - totalPrice() * this.selectedVoucher()!.discountPercent
        );
      }
      return totalPrice();
    });
    return {
      product: product,
      quantity: quantity,
      totalPrice: totalPrice,
      discountedTotalPrice: discountedTotalPrice,
    };
  }
}
