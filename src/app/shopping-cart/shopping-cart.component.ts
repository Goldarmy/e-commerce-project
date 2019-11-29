import { Component, OnInit } from '@angular/core';
import { IProduct } from '../models/product';
import { CartService } from '../services/cart.service';
import { IShoppingCartItem } from '../models/shopping-cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  pageTitle: string = "Shopping Cart";
  shoppingCartitems: IShoppingCartItem[] = [];
  quantity: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9
  ];
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.shoppingCartitems = this.cartService.getItems();
  }

  removeProduct(id: number): void {
    this.cartService.removeItem(id);
    this.shoppingCartitems = this.cartService.getItems();
  }

  updateCart(event, product: IProduct): void {
    this.cartService.updateCart(product, event.value);
  }

  getShoppingCartTotal(): number {
    return this.cartService.getTotalCost();
  }

  getShoppingCartQuantity(): number {
    return this.cartService.getItemCount();
  }
}