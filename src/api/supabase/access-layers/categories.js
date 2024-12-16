import { supabase } from '@/config/supabase'

export const categoriesAccess = {
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('id', { ascending: true })
    
    if (error) throw error
    return data
  },

  async getBySlug(slug) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    return data
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
    
    if (error) throw error
    return data
  } 
}
