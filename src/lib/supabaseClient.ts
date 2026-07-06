import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!url || !anon) throw new Error("Supabase env manquante (.env)");

export const supabase = createClient(url, anon);

export type Invoice = {
  id: number;
  invoice_number: string;
  cde: string | null;
  amount: number;
  factory_inv: number | null;
  marge: number;
  gmt_terms: string | null;
  due_date: string | null;
  client_paye: boolean;
  date_paiement_client: string | null;
  fournisseur_paye: boolean;
  date_paiement_fournisseur: string | null;
  lianzhou_comment: string | null;
};
