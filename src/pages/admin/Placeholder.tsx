export default function Placeholder({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <>
      <div className="crm-page-head">
        <h1 className="crm-page-title">{title}</h1>
        <p className="crm-page-sub">{subtitle ?? "Module en cours de construction."}</p>
      </div>
      <div className="crm-content">
        <div style={{ border: "1px dashed var(--crm-border-2)", borderRadius: 12, padding: "56px 24px", textAlign: "center", background: "var(--crm-ivory)" }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6, fontFamily: "var(--crm-serif)", color: "var(--crm-text)" }}>{title}</div>
          <div style={{ fontSize: 13, color: "var(--crm-text-2)" }}>{subtitle ?? "Bientôt disponible."}</div>
        </div>
      </div>
    </>
  );
}
