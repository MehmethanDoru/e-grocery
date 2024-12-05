import { supabase } from '@/config/supabase'

export const productsAccess = {
  async getProductsByCategoryId(categoryId) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('categoryId', categoryId);

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return data;
  }
}
