import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ippytdyjdjzujtizngom.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Aa5nWzBEJVXcAw0F3s2yug_3V7TsqBk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

// 🟢 VERİTABANI SERVİS YARDIMCILARI (DATABASE HELPER FUNCTIONS)

// 1. Markaları Getir
export async function fetchBrandsFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('brands')
      .select('*, invoices(*)')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.warn('Supabase fetch error, fallback to local state:', error);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase offline or table missing:', err);
    return null;
  }
}

// 2. Yeni Marka Kaydet
export async function saveBrandToSupabase(brandData) {
  try {
    const { data, error } = await supabase
      .from('brands')
      .upsert(brandData)
      .select();
    if (error) console.error('Error saving brand to Supabase:', error);
    return { data, error };
  } catch (err) {
    console.error('Supabase brand save exception:', err);
    return { error: err };
  }
}

// 3. Yeni Fatura Ekle
export async function saveInvoiceToSupabase(invoiceData) {
  try {
    const { data, error } = await supabase
      .from('invoices')
      .insert(invoiceData)
      .select();
    if (error) console.error('Error saving invoice to Supabase:', error);
    return { data, error };
  } catch (err) {
    console.error('Supabase invoice save exception:', err);
    return { error: err };
  }
}

// 4. Gönderi Kaydet
export async function savePostToSupabase(postData) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert(postData)
      .select();
    return { data, error };
  } catch (err) {
    return { error: err };
  }
}
