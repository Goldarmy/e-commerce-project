import { Injectable, OnInit } from '@angular/core';
import { IReview } from '../models/review';
import { IProduct } from '../models/product';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class ReviewService implements OnInit {

  reviews: IReview[] = [];
  product: IProduct;
  options;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getProductReviews(productId: number): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('currentToken')
    });
    this.options = { headers: headers };
    return this.http.get<IReview[]>(`${environment.apiUrl}/products/${productId}/reviews`, this.options)
      .pipe(tap(data => data),
        catchError(this.handleError)
      );
  }

  addReview(productId: number, title: string, body: string, rating: number): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('currentToken')
    });
    this.options = { headers: headers };
    return this.http.post<IReview>(`${environment.apiUrl}/products/${productId}/reviews`, { title, body, rating }, this.options)
      .pipe(tap(data => data),
        catchError(this.handleError));
  }

  deleteReview(productId: number, reviewId: number): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('currentToken')
    });
    this.options = { headers: headers };
    return this.http.delete<any>(`${environment.apiUrl}/products/${productId}/reviews/${reviewId}`, this.options)
      .pipe(tap(data => data),
        catchError(this.handleError));
  }

  updateReview(productId: number, reviewId: number, title: string, body: string, rating: number): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('currentToken')
    });
    this.options = { headers: headers };
    return this.http.put<any>(`${environment.apiUrl}/products/${productId}/reviews/${reviewId}`, { title, body, rating }, this.options)
      .pipe(tap(data => data),
        catchError(this.handleError));
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
