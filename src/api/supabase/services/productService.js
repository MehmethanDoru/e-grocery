import { productsAccess } from '@/api/supabase/access-layers/products'
import { supabase } from '@/config/supabase'

export const productService = {
  async fetchProductsByCategory(categoryId) {
    return await productsAccess.getProductsByCategoryId(categoryId);
  }
}
