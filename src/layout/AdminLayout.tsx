import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth, signOut } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import "@/lib/crm-theme.css";

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const PILOTAGE = [
  { to: "/admin/crm", label: "Tableau de bord", end: true, icon: "M3 3h7v7H3zM14 3h7v4h-7zM14 10h7v11h-7zM3 13h7v8H3z" },
  { to: "/admin/crm/produits", label: "Produits", icon: "M12 2l9 5v10l-9 5-9-5V7z", key: "produits" },
  { to: "/admin/crm/proformas", label: "Proformas", icon: "M6 2h9l5 5v15H6zM15 2v5h5", key: "proformas" },
  { to: "/admin/crm/invoices", label: "Invoices", icon: "M6 2h12v20l-3-2-3 2-3-2-3 2z", key: "invoices" },
];
const OPERATIONS = [
  { to: "/admin/crm/tresorerie", label: "Trésorerie", icon: "M3 6h18v12H3zM3 10h18M7 14h4" },
  { to: "/admin/crm/partenaires", label: "Partenaires", icon: "M9 11a4 4 0 100-8 4 4 0 000 8zM3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2M17 11a3 3 0 100-6" },
];

export default function AdminLayout() {
  const { session } = useAuth();
  const nav = useNavigate();
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    (async () => {
      const [inv, prod] = await Promise.all([
        supabase.from("invoices").select("id", { count: "exact", head: true }),
        supabase.from("produits").select("id", { count: "exact", head: true }),
      ]);
      setCounts({
        proformas: inv.count ?? 0,
        invoices: inv.count ?? 0,
        produits: prod.count ?? 0,
      });
    })();
  }, []);

  const item = (n: any) => (
    <NavLink key={n.to} to={n.to} end={n.end}
      className={({ isActive }) => "crm-nav-item" + (isActive ? " active" : "")}>
      <span className="crm-nav-item-l"><Icon d={n.icon} />{n.label}</span>
      {n.key && counts[n.key] ? <span className="crm-nav-badge">{counts[n.key]}</span> : null}
    </NavLink>
  );

  return (
    <div className="crm-root">
      <div className="crm-shell">
        <aside className="crm-sidebar">
          <div className="crm-brand">
            <div className="crm-brand-logo">LZ</div>
            <div>
              <div className="crm-brand-name">Lianzhou</div>
              <div className="crm-brand-sub">TRADE DESK</div>
            </div>
          </div>
          <nav className="crm-nav">
            <div className="crm-nav-section">PILOTAGE</div>
            {PILOTAGE.map(item)}
            <div className="crm-nav-section">OPÉRATIONS</div>
            {OPERATIONS.map(item)}
            <div className="crm-nav-section">SYSTÈME</div>
            {item({ to: "/admin/crm/reglages", label: "Réglages", icon: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 13a7.5 7.5 0 000-2l2-1.5-2-3.5-2.4 1a7 7 0 00-1.7-1L15 2h-4l-.3 2.5a7 7 0 00-1.7 1l-2.4-1-2 3.5 2 1.5a7.5 7.5 0 000 2l-2 1.5 2 3.5 2.4-1a7 7 0 001.7 1L11 22h4l.3-2.5a7 7 0 001.7-1l2.4 1 2-3.5z" })}
          </nav>
          <div className="crm-sidebar-foot">
            <div className="crm-sidebar-mail">{session?.user.email}</div>
            <button className="crm-logout" onClick={async () => { await signOut(); nav("/"); }}>
              Déconnexion
            </button>
          </div>
        </aside>
        <main className="crm-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
