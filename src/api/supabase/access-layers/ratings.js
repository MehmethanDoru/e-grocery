import { supabase } from "@/config/supabase";

export const ratingsAccess = {
  async updateProductRating(productId, newRating, currentRating, currentReviews) {
    const totalRatingPoints = (currentRating * currentReviews) + newRating;
    const newReviewCount = currentReviews + 1;
    const averageRating = totalRatingPoints / newReviewCount;

    const { data, error } = await supabase
      .from("products")
      .update({
        rating: averageRating.toFixed(1),
        reviews: newReviewCount
      })
      .eq("id", productId);

    if (error) {
      console.error("error Update Product Rating", error);
      return null;
    }

    return data;
  }
}; 