import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle: string = "All Products";
  products: IProduct[] = [
    {
      productId: 1,
      categoryId: 1,
      title: "Adidas Men's Grand Court Sneaker",
      description: "Grey/White",
      price: 41.75,
      smImagePath: "../assets/images/item_1.jpg",
      lgImagePath: "../assets/images/item_1.jpg",
      createdDate: "10/16/2019",
      updatedDate: "10/16/2019"
    },
    {
      productId: 2,
      categoryId: 1,
      title: "CLARKS Men's Raharto Plain Oxford",
      description: " Blue Nubuck",
      price: 59.95,
      smImagePath: "../assets/images/item_2.jpg",
      lgImagePath: "../assets/images/item_2.jpg",
      createdDate: "10/16/2019",
      updatedDate: "10/16/2019"
    },
    {
      productId: 3,
      categoryId: 1,
      title: "adidas Originals Men's Cf Advantage",
      description: "White/Dark Blue",
      price: 46.00,
      smImagePath: "../assets/images/item_3.jpg",
      lgImagePath: "../assets/images/item_3.jpg",
      createdDate: "10/16/2019",
      updatedDate: "10/16/2019"
    },
    {
      productId: 4,
      categoryId: 1,
      title: "adidas Men's CF Lite Racer Byd",
      description: "White/Black",
      price: 52.50,
      smImagePath: "../assets/images/item_4.jpg",
      lgImagePath: "../assets/images/item_4.jpg",
      createdDate: "10/16/2019",
      updatedDate: "10/16/2019"
    },
    {
      productId: 5,
      categoryId: 1,
      title: "Skechers Men's Delson-Axton Sneaker",
      description: "Brown",
      price: 52.90,
      smImagePath: "../assets/images/item_5.jpg",
      lgImagePath: "../assets/images/item_5.jpg",
      createdDate: "10/16/2019",
      updatedDate: "10/16/2019"
    },
    {
      productId: 6,
      categoryId: 1,
      title: "Sperry Men's Striper II Salt Washed CVO Sneaker",
      description: "Gray",
      price: 42.00,
      smImagePath: "../assets/images/item_6.jpg",
      lgImagePath: "../assets/images/item_6.jpg",
      createdDate: "10/16/2019",
      updatedDate: "10/16/2019"
    },
    {
      productId: 7,
      categoryId: 1,
      title: "steve madden Men's Fenta Fashion Sneaker",
      description: "Black Fabric",
      price: 62.00,
      smImagePath: "../assets/images/item_7.jpg",
      lgImagePath: "../assets/images/item_8.jpg",
      createdDate: "10/16/2019",
      updatedDate: "10/16/2019"
    },
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
