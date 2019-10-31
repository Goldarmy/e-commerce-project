import { Injectable } from '@angular/core';
import { IReview } from './review';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  reviews: IReview[] = [
    {
      reviewId: 1,
      userId: 1,
      productId: 1,
      title: "Good Quality",
      body: "I purchased this product 5 years ago and it is still in one piece!",
      rating: 5,
      createdDate: "10/27/2019",
      updatedDate: "10/27/2019",
    },
    {
      reviewId: 2,
      userId: 1,
      productId: 1,
      title: "Love it!",
      body: "I got so many compliments",
      rating: 5,
      createdDate: "10/27/2019",
      updatedDate: "10/27/2019",
    }
  ];

  constructor() { }

  // getReviews(): IReview[] {
  //   return this.reviews;
  // }

  getProductReviews(product: IProduct): IReview[] {
    return this.reviews.filter((review: IReview) => review.productId === product.productId);
  }

  addReview(productId: number, title: string, body: string, rating: number) {
    let review: IReview = {
      reviewId: this.reviews.length + 1,
      userId: 1,
      productId: productId,
      title: title,
      body: body,
      rating: rating,
      createdDate: this.getDate(),
      updatedDate: this.getDate(),
    }
    this.reviews.push(review);
  }

  deleteReview(review: IReview) {
    this.reviews = this.reviews.filter(r => (r.reviewId !== review.reviewId));
  }

  updateReview(review: IReview): void {
    let updatedReview = this.reviews.find(r => (r.reviewId === review.reviewId))
    updatedReview.title = review.title;
    updatedReview.body = review.body;
    updatedReview.updatedDate = this.getDate();
  }

  getDate(): string {
    let month = new Date().getMonth() + 1;
    return month + "/" + new Date().getDate() + "/" + new Date().getFullYear();
  }
}