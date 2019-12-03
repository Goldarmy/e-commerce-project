import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { IUser } from '../models/user';
import { OrderService } from '../services/order.service';
import { ReviewService } from '../services/review.service';
import { IReview } from '../models/review';
import { IOrder } from '../models/order';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  pageTitle: string = "Profile";
  currentUser: IUser;
  userReviews: IReview[];
  userOrders: IOrder[];

  constructor(private authenticationService: AuthenticationService, private orderService: OrderService, private reviewService: ReviewService) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.reviewService.getUserReviews().subscribe((reviews) => {
      this.userReviews = reviews;
    });
    this.orderService.getUserOrders().subscribe((orders) => {
      this.userOrders = orders;
    });
  }
}
