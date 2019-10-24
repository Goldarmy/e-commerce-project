import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cartItemCount: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.currentItemCount.subscribe(count => this.cartItemCount = count);
  }

}
