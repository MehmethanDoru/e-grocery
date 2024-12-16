import { categoriesAccess } from '../access-layers/categories'

export const categoryService = {
  async getAllCategories() {
    try {
      return await categoriesAccess.getAll()
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  },

  async getCategoryBySlug(slug) {
    try {
      return await categoriesAccess.getBySlug(slug)
    } catch (error) {
      console.log('Error fetching category:', error)
      throw error
    }
  },

    async getCategoryById(id) {
      try {
        const data = await categoriesAccess.getById(id);
        return data;
      } catch (error) {
        console.error(`Error fetching category with id ${id}:`, error);
        return null;
      }
    }
  
}