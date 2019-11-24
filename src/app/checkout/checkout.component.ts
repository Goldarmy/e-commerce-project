import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { IProduct } from '../product';
import { IShoppingCartItem } from '../shopping-cart-item';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  pageTitle: string = "Checkout";
  products: IProduct[] = [];
  shoppingCartitems: IShoppingCartItem[] = [];
  constructor(private cartService: CartService, private productService: ProductService) { }

  ngOnInit() {
    this.shoppingCartitems = this.cartService.getItems();
    this.shoppingCartitems.forEach(item => {
      this.productService.getProduct(item.productId).subscribe(product => {
        this.products.push(product);
      })
    })

  }

}
