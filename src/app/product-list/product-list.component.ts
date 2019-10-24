import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';
import { MatDialog } from '@angular/material';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle: string = "All Products";
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];

  constructor(private productService: ProductService, private cartService: CartService, public dialog: MatDialog) { }

  ngOnInit() {
    this.products = this.filteredProducts = this.productService.getProducts();
  }

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filteredProducts =  this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((product: IProduct) =>
      product.title.toLowerCase().indexOf(filterBy) !== -1);
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: data
    });
  }

  addToCart(product: IProduct): void {
    this.cartService.addToCart(product);
    this.openDialog({
      title: 'Cart',
      message: `${product.title} has been added to your Cart. Would you like to continue shopping or checkout now?`
    });
  }

}
