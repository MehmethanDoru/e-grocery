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
      console.error('Error fetching category:', error)
      throw error
    }
  }
}