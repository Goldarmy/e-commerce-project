import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private itemCount = new BehaviorSubject<number>(0);
  currentItemCount = this.itemCount.asObservable();
  items: IProduct[] = [];

  constructor() { }

  cartCountChange(count: number){
    this.itemCount.next(count);
  }

  addToCart(product: IProduct): void {
    this.items.push(product);
    this.cartCountChange(this.items.length);
  }

  getItems(): IProduct[] {
    return this.items
  }

  clearCart() {
    this.items = [];
    this.cartCountChange(this.items.length);
    return this.items;
  }
}
