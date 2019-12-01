import { Injectable } from '@angular/core';
import { IProduct } from '../models/product';
import { BehaviorSubject } from 'rxjs';
import { IShoppingCartItem } from '../models/shopping-cart-item';

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

  updateCart(product: IProduct, quantity?: number): void {
    let existingItem = this.items.find(p => p.product.id === product.id)
    if (existingItem) {
      existingItem.quantity = (quantity) ? quantity : existingItem.quantity + 1;
    } else {
      this.items.push({
        product: product,
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
    this.items = this.items.filter(item => item.product.id !== id);
    this.cartCountChange((this.items.length) ? this.items.map(this.quantity).reduce(this.sum) : 0);
  }

  getItems(): IShoppingCartItem[] {
    return this.items
  }

  clearCart() {
    this.items = [];
    this.cartCountChange(0);
    return this.items;
  }

  getTotalCost(): number {
    let totalCost = 0;
    this.items.forEach(item => {
      totalCost += item.product.price * item.quantity
    })
    return totalCost;
  }

  getItemCount(): number {
    return (this.items.length) ? this.items.map(this.quantity).reduce(this.sum) : 0;
  }
}
