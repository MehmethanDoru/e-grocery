import { supabase } from "@/config/supabase";

export const productsAccess = {
  async getProductsByCategoryId(categoryId) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("categoryId", categoryId);

    if (error) {
      console.error("Error fetching products:", error);
      return [];
    }

    return data;
  },

  async getProductById(productId) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId);

    if (error) {
      console.error("Error fetching product:", error);
      return null;
    }

    return data;
  },

  async getDiscountedProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .gt("discount", 0);

    if (error) {
      console.error("Error fetching discounted products:", error);
      return [];
    }

    return data;
  },

  async getMightNeedProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("extra_info", "might-need");

    if (error) {
      console.error("Error fetching might need products:", error);
      return [];
    }

    return data;
  },

  async getGoodWhileTVProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("extra_info", "tv");

    if (error) {
      console.error("Error fetching good while tv products:", error);
      return [];
    }

    return data;
  }     
};
