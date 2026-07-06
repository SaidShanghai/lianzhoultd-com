import { useEffect, useMemo, useState } from "react";
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
  d ? new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "2-digit" }) : "—";
const norm = (s: unknown) =>
  String(s ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

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
            <div className="crm-table-wrap" style={{ overflowX: "auto" }}>
              <table className="crm-table" style={{ minWidth: 1400 }}>
                <thead><tr>
                  <th>NOM</th><th>CDE</th><th>PI</th><th>INVOICE</th>
                  <th className="crm-num">AMOUNT</th><th>ETD</th><th>BOOK</th><th>SHIPPED</th>
                  <th>DOCS</th><th>GMT</th><th>VENDOR</th>
                  <th className="crm-num">FACTORY</th><th>F.TERMS</th><th>DC N°</th>
                  <th>DUE</th><th className="crm-num">MARGE</th>
                  <th>CLIENT</th><th>COMMENT</th><th className="crm-num">DEPOSIT</th>
                </tr></thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id}>
                      <td>{r.nom || "—"}</td>
                      <td style={{ maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={r.cde || ""}>{r.cde || "—"}</td>
                      <td>{r.pi || "—"}</td>
                      <td style={{ fontWeight: 600 }}>{r.invoice_number}</td>
                      <td className="crm-num">{nf(r.amount)} $</td>
                      <td>{fdate(r.etd)}</td>
                      <td>{fdate(r.book)}</td>
                      <td>{fdate(r.shipped)}</td>
                      <td>{r.docs_sent ? <span className="crm-badge ok">{r.docs_sent}</span> : "—"}</td>
                      <td>{r.gmt_terms || "—"}</td>
                      <td>{r.vendor || "—"}</td>
                      <td className="crm-num" style={{ color: "var(--crm-text-2)" }}>{nf(r.factory_inv)} $</td>
                      <td>{r.factory_terms || "—"}</td>
                      <td style={{ maxWidth: 110, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={r.dc_number || ""}>{r.dc_number || "—"}</td>
                      <td>{fdate(r.due_date)}</td>
                      <td className="crm-num" style={{ color: "var(--crm-mint)", fontWeight: 600 }}>{nf(r.marge)} $</td>
                      <td><ClientBadge v={r.client_paid} /></td>
                      <td style={{ fontSize: 12, color: "var(--crm-text-2)" }}>{r.lianzhou_comment || "—"}</td>
                      <td className="crm-num" style={{ color: r.deposit_amount && r.deposit_amount < 0 ? "var(--crm-red)" : "var(--crm-text-2)" }}>
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
