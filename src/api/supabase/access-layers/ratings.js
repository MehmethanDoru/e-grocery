import { supabase } from "@/config/supabase";

export const ratingsAccess = {
  async updateProductRating(productId, newRating) {
    try {
      // Önce mevcut ürün verilerini çekelim
      const { data: currentProduct, error: fetchError } = await supabase
        .from("products")
        .select("rating, reviews")
        .eq("id", productId)
        .single();

      if (fetchError) {
        console.error("Ürün verileri çekilemedi:", fetchError);
        throw new Error("Ürün verileri çekilemedi");
      }

      // Yeni değerleri hesaplayalım
      const currentRating = currentProduct.rating || 0;
      const currentReviews = currentProduct.reviews || 0;
      
      const totalRatingPoints = (Number(currentRating) * Number(currentReviews)) + Number(newRating);
      const newReviewCount = Number(currentReviews) + 1;
      const averageRating = parseFloat((totalRatingPoints / newReviewCount).toFixed(1));

      console.log('Hesaplanan değerler:', {
        totalRatingPoints,
        newReviewCount,
        averageRating
      });

      // Şimdi güncelleme yapalım
      const { data, error } = await supabase
        .from("products")
        .update({
          rating: averageRating,
          reviews: newReviewCount
        })
        .eq("id", productId)
        .select();

      if (error) {
        console.error("Rating güncelleme detaylı hata:", error);
        throw new Error("Derecelendirme güncellenemedi");
      }

      return data[0];
    } catch (error) {
      console.error("Tam hata detayı:", error);
      return null;
    }
  }
}; 