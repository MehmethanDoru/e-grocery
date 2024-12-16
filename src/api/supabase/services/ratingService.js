import { ratingsAccess } from '../access-layers/ratings';

export const ratingService = {
  async updateProductRating(productId, newRating, currentRating, currentReviews) {
    return await ratingsAccess.updateProductRating(
      productId,
      newRating,
      currentRating,
      currentReviews
    );
  }
}; 