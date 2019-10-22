import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  pageTitle: string = "Checkout";
  items: IProduct[] = [];
  
  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.items = this.cartService.getItems();
  }

}
