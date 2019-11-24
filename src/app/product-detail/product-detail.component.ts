import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { ReviewService } from '../review.service';
import { IReview } from '../review';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { CartService } from '../cart.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = "Product Details";
  product: IProduct;
  errorMessage: string;
  reviewForm: FormGroup;
  reviews: IReview[];

  reviewToEdit: IReview;
  editState: boolean = false;
  ratings: number[] = [
    1,2,3,4,5
  ];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private reviewService: ReviewService,
    private fb: FormBuilder,
    private cartService: CartService,
    public dialog: MatDialog) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');

    this.productService.getProduct(id).subscribe({
      next: product => {
        this.product = product;
        this.reviews = this.reviewService.getProductReviews(this.product);
      },
      error: err => this.errorMessage = err
    });

    this.reviewForm = this.fb.group({
      rating: 5,
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    })

  }

  addReview(): void {
    this.reviewService.addReview(this.product.productId,
      this.reviewForm.get('title').value,
      this.reviewForm.get('content').value,
      this.reviewForm.get('rating').value);

    this.reviews = this.reviewService.getProductReviews(this.product);
    this.clearForm();
  }

  clearForm(): void {
    this.reviewForm.reset();
    //this.reviewForm.get('title').setValue("");
    //this.reviewForm.get('content').setValue("");
    this.reviewForm.get('rating').setValue(5);
  }

  editReview($event, review): void{
    this.editState = true;
    this.reviewToEdit = review;
  }

  updateReview(review): void{
    this.reviewService.updateReview(review);
    this.clearState();
  }

  deleteReview(review: IReview){
    this.reviewService.deleteReview(review);
    this.clearState();
    this.reviews = this.reviewService.getProductReviews(this.product);
  }

  clearState(): void {
    this.editState = false;
    this.reviewToEdit = null;
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: data
    });
  }
  
  addToCart(product: IProduct): void {
    this.cartService.updateCart(product);
    this.openDialog({
      title: 'Cart',
      message: `${product.title} has been added to your Cart. Would you like to continue shopping or checkout now?`
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
