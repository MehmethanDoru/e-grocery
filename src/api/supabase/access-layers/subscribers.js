import { supabase } from '@/config/supabase';

export const subscribersAccess = {
  async addSubscriber(email) {
    try {
      // First check for existing subscriber
      const { data: existingSubscriber, error: checkError } = await supabase
        .from('subscribers')
        .select('email')
        .eq('email', email)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing subscriber:', checkError);
        return { error: checkError.message, status: 500 };
      }

      if (existingSubscriber) {
        return { error: 'Email already exists', status: 409 };
      }

      // Add new subscriber
      const { data, error: insertError } = await supabase
        .from('subscribers')
        .insert([{ email }])
        .select();

      if (insertError) {
        console.error('Error inserting subscriber:', insertError);
        return { error: insertError.message, status: 500 };
      }

      return { data, status: 201 };
    } catch (error) {
      console.error('Unexpected error in addSubscriber:', error);
      return { error: error.message, status: 500 };
    }
  }
}; 