import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { BehaviorSubject } from 'rxjs';
import { IShoppingCartItem } from './shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private itemCount = new BehaviorSubject<number>(0);
  currentItemCount = this.itemCount.asObservable();

  items: IShoppingCartItem[] = [];

  constructor() { }

  cartCountChange(count: number) {
    this.itemCount.next(count);
  }

  updateCart(product: IProduct, quanity?: number): void {
    let existingItem = this.items.find(p => p.productId === product.productId)
    if (existingItem) {
      existingItem.quantity = (quanity) ? quanity : existingItem.quantity + 1;
    } else {
      this.items.push({
        productId: product.productId,
        quantity: 1
      });
    }

    this.cartCountChange((this.items.length) ? this.items.map(this.quantity).reduce(this.sum) : 0);
  }

  quantity(item: IShoppingCartItem) {
    return item.quantity;
  }

  sum(prev, next) {
    return prev + next;
  }

  removeItem(id: number) {
    this.items = this.items.filter(item => item.productId !== id);
    this.cartCountChange((this.items.length) ? this.items.map(this.quantity).reduce(this.sum) : 0);
  }

  getItems(): IShoppingCartItem[] {
    return this.items
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
