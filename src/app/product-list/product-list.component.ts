import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';
import { CartService } from '../cart.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ProductService } from '../product.service';

export interface PriceRange {
  text: string;
  min: number;
  max: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  pageTitle: string = "All Products";
  errorMessage: string;
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  priceRanges: PriceRange[] = [
    {
      text: 'Under $25',
      min: 0,
      max: 25
    }, {
      text: '$25 to $50',
      min: 25,
      max: 50
    }, {
      text: '$50 to $100',
      min: 50,
      max: 100
    }, {
      text: '$100 to $200',
      min: 100,
      max: 200
    }, {
      text: '$200 & Above',
      min: 200,
      max: 1000000
    }, {
      text: 'Any Price',
      min: 0,
      max: 1000000
    }]

  constructor(private productService: ProductService, private cartService: CartService, public dialog: MatDialog) { }

  ngOnInit() {
    //this.products = this.filteredProducts = this.productService.getProducts();
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any>error   // this is casting
    );
    this.priceFilter = 'Any Price';
    this.genderFilter = 'All';
  }

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performTextFilter(this.listFilter) : this.products;
    this.filteredProducts = this.priceFilter ? this.performPriceFilter(this.priceFilter, this.filteredProducts) : this.filteredProducts;
    this.filteredProducts = this.genderFilter !== 'All' ? this.performGenderFilter(this.genderFilter, this.filteredProducts) : this.filteredProducts;
  }

  _priceFilter: string;
  get priceFilter(): string {
    return this._priceFilter;
  }
  set priceFilter(value: string) {
    this._priceFilter = value;
    this.filteredProducts = this.listFilter ? this.performTextFilter(this.listFilter) : this.products;
    this.filteredProducts = this.priceFilter ? this.performPriceFilter(this.priceFilter, this.filteredProducts) : this.filteredProducts;
    this.filteredProducts = this.genderFilter !== 'All' ? this.performGenderFilter(this.genderFilter, this.filteredProducts) : this.filteredProducts;
  }

  _genderFilter: string;
  get genderFilter(): string {
    return this._genderFilter;
  }
  set genderFilter(value: string) {
    this._genderFilter = value;
    this.filteredProducts = this.listFilter ? this.performTextFilter(this.listFilter) : this.products;
    this.filteredProducts = this.priceFilter ? this.performPriceFilter(this.priceFilter, this.filteredProducts) : this.filteredProducts;
    this.filteredProducts = this.genderFilter !== 'All' ? this.performGenderFilter(this.genderFilter, this.filteredProducts) : this.filteredProducts;
  }

  performTextFilter(filterByText: string): IProduct[] {
    filterByText = filterByText.toLowerCase();

    return this.products.filter((product: IProduct) =>
      product.title.toLowerCase().indexOf(filterByText) !== -1);
  }

  performPriceFilter(filterByPrice: string, filteredList?: IProduct[]): IProduct[] {
    let priceRange: PriceRange = this.priceRanges.find((p) => p.text === filterByPrice);
    filteredList = filteredList ? filteredList : this.products;

    return filteredList.filter((product: IProduct) =>
      product.price >= priceRange.min && product.price < priceRange.max);
  }

  performGenderFilter(filterByGender: string, filteredList?: IProduct[]): IProduct[] {
    filteredList = filteredList ? filteredList : this.products;
    let gender: number = filterByGender === 'Male' ? 1 : 2;
    return filteredList.filter((product: IProduct) =>
      product.categoryId === gender);
  }

  clearFilter(): void {
    this.filteredProducts = this.products;
    this.priceFilter = 'Any Price';
    this.genderFilter = 'All';
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: data
    });

  };

  addToCart(product: IProduct): void {
    this.cartService.addToCart(product);
    this.openDialog({
      title: 'Cart',
      message: `${product.title} has been added to your Cart. Would you like to continue shopping or checkout now?`
    });
  }
}
