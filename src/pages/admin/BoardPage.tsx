import { type CSSProperties, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Board = {
  id: number;
  nom: string | null; cde: string | null; pi: string | null; invoice_number: string;
  amount: number | null; etd: string | null; book: string | null; shipped: string | null;
  docs_sent: string | null; gmt_terms: string | null; vendor: string | null;
  factory_inv: number | null; factory_terms: string | null; dc_number: string | null;
  due_date: string | null; client_paid: string | null; lianzhou_comment: string | null;
  deposit_amount: number | null; marge: number | null;
};

const nf = (n: number | null) => n == null ? "—" : Math.round(n).toLocaleString("fr-FR");
const fdate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit" }) : "—";
const norm = (s: unknown) =>
  String(s ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// Largeurs fixes par colonne (total ~1034px) — table en tableLayout:fixed
const W = {
  nom: 46, cde: 60, pi: 60, inv: 66, amount: 62, etd: 50, book: 50, ship: 50, doc: 38,
  gmt: 44, vendor: 66, fact: 60, fterms: 52, dc: 56, due: 50, marge: 58, client: 54,
  comment: 60, deposit: 52,
};
// Cellule compacte : ellipsis + nowrap + padding serré
const cell: CSSProperties = { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", padding: "5px 6px" };
const cd = (w: number, extra?: CSSProperties): CSSProperties => ({ ...cell, width: w, ...extra });
const thS = (w: number): CSSProperties => ({ width: w, padding: "6px 6px" });

// Badge de statut client
function ClientBadge({ v }: { v: string | null }) {
  if (!v) return <span style={{ color: "var(--crm-text-3)" }}>—</span>;
  const cls = v === "PAID" ? "ok" : v === "FINANCED" ? "warn" : "info";
  return <span className={`crm-badge ${cls}`}>{v}</span>;
}

export default function BoardPage() {
  const [rows, setRows] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("board").select("*")
        .order("due_date", { ascending: true, nullsFirst: false });
      if (error) setErr(error.message);
      else setRows((data ?? []) as Board[]);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    const terms = norm(q).split(/\s+/).filter(Boolean);
    if (!terms.length) return rows;
    return rows.filter((r) => {
      const h = norm([
        r.nom, r.cde, r.pi, r.invoice_number, r.vendor,
        r.gmt_terms, r.factory_terms, r.dc_number,
        r.client_paid, r.lianzhou_comment, r.docs_sent,
        r.amount, r.factory_inv, r.marge,
      ].join(" "));
      return terms.every((t) => h.includes(t));
    });
  }, [rows, q]);

  const ca = filtered.reduce((s, r) => s + Number(r.amount || 0), 0);
  const marge = filtered.reduce((s, r) => s + Number(r.marge || 0), 0);
  const taux = ca ? (100 * marge / ca).toFixed(1) : "0";

  return (
    <>
      <div className="crm-page-head">
        <h1 className="crm-page-title">Board</h1>
        <p className="crm-page-sub">
          {q ? `${filtered.length} résultat${filtered.length > 1 ? "s" : ""} sur ${rows.length}`
             : `${rows.length} factures · miroir du tableau de compta`}
        </p>
      </div>

      <div className="crm-content">
        <div className="crm-kpis">
          <div className="crm-kpi"><div className="crm-kpi-label">CA {q ? "(filtré)" : "total"}</div><div className="crm-kpi-value">${nf(ca)}</div></div>
          <div className="crm-kpi accent"><div className="crm-kpi-label">Marge brute</div><div className="crm-kpi-value">${nf(marge)}</div></div>
          <div className="crm-kpi"><div className="crm-kpi-label">Taux marge</div><div className="crm-kpi-value">{taux}%</div></div>
          <div className="crm-kpi"><div className="crm-kpi-label">Factures</div><div className="crm-kpi-value">{filtered.length}</div></div>
        </div>

        <div className="crm-card">
          <div className="crm-card-head">
            <span className="crm-card-title">Factures</span>
            <div className="crm-btn-row">
              <input className="crm-input" value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Rechercher (invoice, vendor, gérant, CDE, statut…)" style={{ width: 320 }} autoFocus />
              <button className="crm-btn">Export</button>
            </div>
          </div>

          {loading && <p style={{ padding: 18, fontSize: 13, color: "var(--crm-text-2)" }}>Chargement…</p>}
          {err && <p style={{ padding: 18, color: "var(--crm-red)", fontSize: 13 }}>Erreur : {err}</p>}
          {!loading && !err && filtered.length === 0 && (
            <p style={{ padding: 18, fontSize: 13, color: "var(--crm-text-2)" }}>Aucun résultat.</p>
          )}
          {!loading && !err && filtered.length > 0 && (
            <div className="crm-table-wrap">
              <table className="crm-table" style={{ width: "100%", tableLayout: "fixed", borderCollapse: "collapse", fontSize: 11 }}>
                <thead><tr>
                  <th style={thS(W.nom)}>NOM</th>
                  <th style={thS(W.cde)}>CDE</th>
                  <th style={thS(W.pi)}>PI</th>
                  <th style={thS(W.inv)}>INVOICE</th>
                  <th className="crm-num" style={thS(W.amount)}>AMOUNT</th>
                  <th style={thS(W.etd)}>ETD</th>
                  <th style={thS(W.book)}>BOOK</th>
                  <th style={thS(W.ship)}>SHIPPED</th>
                  <th style={thS(W.doc)}>DOCS</th>
                  <th style={thS(W.gmt)}>GMT</th>
                  <th style={thS(W.vendor)}>VENDOR</th>
                  <th className="crm-num" style={thS(W.fact)}>FACTORY</th>
                  <th style={thS(W.fterms)}>F.TERMS</th>
                  <th style={thS(W.dc)}>DC N°</th>
                  <th style={thS(W.due)}>DUE</th>
                  <th className="crm-num" style={thS(W.marge)}>MARGE</th>
                  <th style={thS(W.client)}>CLIENT</th>
                  <th style={thS(W.comment)}>COMMENT</th>
                  <th className="crm-num" style={thS(W.deposit)}>DEPOSIT</th>
                </tr></thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id}>
                      <td style={cd(W.nom)} title={r.nom ?? ""}>{r.nom || "—"}</td>
                      <td style={cd(W.cde)} title={r.cde ?? ""}>{r.cde || "—"}</td>
                      <td style={cd(W.pi)} title={r.pi ?? ""}>{r.pi || "—"}</td>
                      <td style={cd(W.inv, { fontWeight: 600 })} title={r.invoice_number}>{r.invoice_number}</td>
                      <td className="crm-num" style={cd(W.amount)} title={r.amount != null ? String(r.amount) : ""}>{nf(r.amount)} $</td>
                      <td style={cd(W.etd)} title={r.etd ?? ""}>{fdate(r.etd)}</td>
                      <td style={cd(W.book)} title={r.book ?? ""}>{fdate(r.book)}</td>
                      <td style={cd(W.ship)} title={r.shipped ?? ""}>{fdate(r.shipped)}</td>
                      <td style={cd(W.doc, { textAlign: "center", color: r.docs_sent ? "var(--crm-mint)" : "var(--crm-text-3)" })} title={r.docs_sent ?? ""}>{r.docs_sent ? "✓" : "—"}</td>
                      <td style={cd(W.gmt)} title={r.gmt_terms ?? ""}>{r.gmt_terms || "—"}</td>
                      <td style={cd(W.vendor)} title={r.vendor ?? ""}>{r.vendor || "—"}</td>
                      <td className="crm-num" style={cd(W.fact, { color: "var(--crm-text-2)" })} title={r.factory_inv != null ? String(r.factory_inv) : ""}>{nf(r.factory_inv)} $</td>
                      <td style={cd(W.fterms)} title={r.factory_terms ?? ""}>{r.factory_terms || "—"}</td>
                      <td style={cd(W.dc)} title={r.dc_number ?? ""}>{r.dc_number || "—"}</td>
                      <td style={cd(W.due)} title={r.due_date ?? ""}>{fdate(r.due_date)}</td>
                      <td className="crm-num" style={cd(W.marge, { color: "var(--crm-mint)", fontWeight: 600 })} title={r.marge != null ? String(r.marge) : ""}>{nf(r.marge)} $</td>
                      <td style={cd(W.client)} title={r.client_paid ?? ""}><ClientBadge v={r.client_paid} /></td>
                      <td style={cd(W.comment, { color: "var(--crm-text-2)" })} title={r.lianzhou_comment ?? ""}>{r.lianzhou_comment || "—"}</td>
                      <td className="crm-num" style={cd(W.deposit, { color: r.deposit_amount && r.deposit_amount < 0 ? "var(--crm-red)" : "var(--crm-text-2)" })} title={r.deposit_amount != null ? String(r.deposit_amount) : ""}>
                        {r.deposit_amount != null ? nf(r.deposit_amount) + " $" : "—"}
                      </td>
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
