import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { IShoppingCartItem } from '../shopping-cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  pageTitle: string = "Shopping Cart";
  products: IProduct[] = [];
  shoppingCartitems: IShoppingCartItem[] = [];
  quantity: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9
  ];

  constructor(private cartService: CartService, private productService: ProductService) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData(): void {
    this.products = [];
    this.shoppingCartitems = this.cartService.getItems();
    this.shoppingCartitems.forEach(item => {
      this.productService.getProduct(item.productId).subscribe(product => {
        this.products.push(product);
      })
    })
  }

  removeProduct(id: number): void {
    this.cartService.removeItem(id);
    this.refreshData();
  }

  updateCart(event, product: IProduct): void {
    this.cartService.updateCart(product, event.value);
  }

}
