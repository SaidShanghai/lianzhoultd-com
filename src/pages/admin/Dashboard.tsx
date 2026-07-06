import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Row = {
  id: number; invoice_number: string; cde: string | null;
  amount: number; factory_inv: number | null; marge: number;
  gmt_terms: string | null; due_date: string | null;
  client_paye: boolean; fournisseur_paye: boolean;
  gerants: { nom: string } | null; fournisseurs: { nom: string } | null;
};

const nf = (n: number) => Math.round(n).toLocaleString("fr-FR");
const fmtDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }) : "—";

export default function Dashboard() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("invoices")
        .select("id,invoice_number,cde,amount,factory_inv,marge,gmt_terms,due_date,client_paye,fournisseur_paye,gerants(nom),fournisseurs(nom)")
        .order("due_date", { ascending: true, nullsFirst: false });
      if (error) setErr(error.message);
      else setRows((data ?? []) as unknown as Row[]);
      setLoading(false);
    })();
  }, []);

  const f = rows.filter(r => {
    const s = q.toLowerCase();
    return !s || r.invoice_number.toLowerCase().includes(s)
      || (r.fournisseurs?.nom ?? "").toLowerCase().includes(s)
      || (r.cde ?? "").toLowerCase().includes(s);
  });

  const ca = f.reduce((s, r) => s + Number(r.amount), 0);
  const marge = f.reduce((s, r) => s + Number(r.marge), 0);
  const encaisse = f.filter(r => r.client_paye).reduce((s, r) => s + Number(r.marge), 0);
  const taux = ca ? (100 * marge / ca).toFixed(1) : "0";

  const statut = (r: Row) =>
    r.client_paye && r.fournisseur_paye
      ? <span className="crm-badge ok">Soldé</span>
      : r.client_paye
        ? <span className="crm-badge ok">Payé client</span>
        : <span className="crm-badge warn">En cours</span>;

  return (
    <>
      <div className="crm-page-head">
        <h1 className="crm-page-title">Tableau de bord</h1>
        <p className="crm-page-sub">{f.length} commandes · marge brute suivie en temps réel</p>
      </div>
      <div className="crm-content">
        <div className="crm-kpis">
          <div className="crm-kpi"><div className="crm-kpi-label">CA total</div><div className="crm-kpi-value">${nf(ca)}</div></div>
          <div className="crm-kpi accent"><div className="crm-kpi-label">Marge brute</div><div className="crm-kpi-value">${nf(marge)}</div></div>
          <div className="crm-kpi"><div className="crm-kpi-label">Taux marge</div><div className="crm-kpi-value">{taux}%</div></div>
          <div className="crm-kpi"><div className="crm-kpi-label">Encaissé</div><div className="crm-kpi-value">${nf(encaisse)}</div></div>
        </div>

        <div className="crm-card">
          <div className="crm-card-head">
            <span className="crm-card-title">Commandes</span>
            <div className="crm-btn-row">
              <input className="crm-input" value={q} onChange={e => setQ(e.target.value)} placeholder="Rechercher…" />
              <button className="crm-btn">Export</button>
            </div>
          </div>

          {loading && <p style={{ padding: 18, fontSize: 13, color: "var(--crm-text-2)" }}>Chargement…</p>}
          {err && <p style={{ padding: 18, color: "var(--crm-red)", fontSize: 13 }}>Erreur : {err}</p>}
          {!loading && !err && (
            <div className="crm-table-wrap">
              <table className="crm-table">
                <thead><tr>
                  <th>INVOICE</th><th>GÉRANT</th><th>FOURNISSEUR</th>
                  <th className="crm-num">MONTANT</th><th className="crm-num">MARGE</th>
                  <th>DUE</th><th>STATUT</th>
                </tr></thead>
                <tbody>
                  {f.map(r => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 600 }}>{r.invoice_number}</td>
                      <td>{r.gerants?.nom ?? "—"}</td>
                      <td>{r.fournisseurs?.nom ?? "—"}</td>
                      <td className="crm-num">{nf(Number(r.amount))} $</td>
                      <td className="crm-num" style={{ color: "var(--crm-mint)", fontWeight: 600 }}>{nf(Number(r.marge))} $</td>
                      <td>{fmtDate(r.due_date)}</td>
                      <td>{statut(r)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
