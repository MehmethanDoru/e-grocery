import { productsAccess } from '@/api/supabase/access-layers/products'
import { supabase } from '@/config/supabase'

export const productService = {
  async fetchProductsByCategory(categoryId) {
    return await productsAccess.getProductsByCategoryId(categoryId);
  },
  
  async fetchProductById(productId) {
    return await productsAccess.getProductById(productId);
  },

  async fetchDiscountedProducts() {
    return await productsAccess.getDiscountedProducts();
  },

  async fetchMightNeedProducts() {
    return await productsAccess.getMightNeedProducts();
  },

  async fetchGoodWhileTVProducts() {
    return await productsAccess.getGoodWhileTVProducts();
  }
}   
