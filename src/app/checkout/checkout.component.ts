import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { IShoppingCartItem } from '../models/shopping-cart-item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  pageTitle: string = "Checkout";
  shoppingCartitems: IShoppingCartItem[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.shoppingCartitems = this.cartService.getItems();
  }

}
