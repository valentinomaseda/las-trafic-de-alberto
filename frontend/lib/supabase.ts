import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan variables de entorno NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

/**
 * Cliente Supabase para el frontend.
 * Usa la ANON KEY — permisos limitados por RLS.
 * Para operaciones de admin (con sesión activa), la sesión del usuario
 * autenticado eleva los permisos automáticamente.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos que mapean exactamente el esquema de Supabase
export type Show = {
  id: string;
  title: string;
  venue: string;
  event_date: string; // ISO timestamp
  image_url: string;
  status: 'available' | 'few_seats' | 'sold_out';
  created_at: string;
};

export type Package = {
  id: string;
  title: string;
  subtitle: string;
  duration_days: number;
  duration_nights: number;
  hotel_name: string | null;
  excursions_included: string | null;
  image_url: string;
  price_estimation: number | null;
  tags: string[] | null;
  is_active: boolean;
  created_at: string;
};
