import { Injectable, OnInit } from '@angular/core';
import { IReview } from '../models/review';
import { IProduct } from '../models/product';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class ReviewService implements OnInit{

  reviews: IReview[] = [];
  product: IProduct;
  options;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('currentToken')
    });
    this.options = { headers: headers };
  }

  getProductReviews(productId: number) {
    return this.http.get<IReview[]>(`${environment.apiUrl}/${productId}/reviews`, this.options)
    .pipe(
      catchError(this.handleError)
    );
  }
  
  addReview(productId: number, title: string, body: string, rating: number) {
    return this.http.post<any>(`${environment.apiUrl}/${productId}/reviews`, { title, body, rating }, this.options)
    .pipe(map(review => {
      if (review) {
        return review;
      }
    }));
  }

  deleteReview(productId: number,reviewId: number) {
    return this.http.delete<any>(`${environment.apiUrl}/${productId}/reviews/${reviewId}`, this.options)
    .pipe(map(review => {
      if (review) {
        return review;
      }
    }));
  }

  updateReview(productId: number, reviewId: number, title:string, body: string, rating: number) {
    return this.http.put<any>(`${environment.apiUrl}/${productId}/reviews/${reviewId}`, { title, body, rating })
    .pipe(map(review => {
      if (review) {
        return review;
      }
    }));
  }

  getDate(): string {
    let month = new Date().getMonth() + 1;
    return month + "/" + new Date().getDate() + "/" + new Date().getFullYear();
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
