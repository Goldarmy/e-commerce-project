import { Injectable } from '@angular/core';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  items: IProduct[] = [];

  constructor() { }

  addToCart(product: IProduct): void {
    this.items.push(product);
  }

  getItems(): IProduct[] {
    return this.items
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
