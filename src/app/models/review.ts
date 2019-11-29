export interface IReview {
    reviewId: number;
    userId: number;
    productId: number;
    title: string;
    body: string;
    rating: number;
    createdDate: string;
    updatedDate: string;
}