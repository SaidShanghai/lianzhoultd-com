import { useEffect, useState } from "react";
import { supabase, type Invoice } from "@/lib/supabaseClient";
import { useAuth, signOut } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

const fmt = (n: number) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function CrmDashboard() {
  const { session } = useAuth();
  const [rows, setRows] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    const { data, error } = await supabase
      .from("invoices")
      .select("id,invoice_number,cde,amount,factory_inv,marge,gmt_terms,due_date,client_paye,date_paiement_client,fournisseur_paye,date_paiement_fournisseur,lianzhou_comment")
      .order("due_date", { ascending: true, nullsFirst: false });
    if (error) setErr(error.message);
    else setRows((data ?? []) as Invoice[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const togglePaye = async (
    r: Invoice,
    field: "client_paye" | "fournisseur_paye",
    checked: boolean,
  ) => {
    const dateField = field === "client_paye" ? "date_paiement_client" : "date_paiement_fournisseur";
    const newDate = checked ? new Date().toISOString().slice(0, 10) : null;
    // maj optimiste
    setRows((prev) =>
      prev.map((row) => (row.id === r.id ? { ...row, [field]: checked, [dateField]: newDate } : row)),
    );
    const { error } = await supabase
      .from("invoices")
      .update({ [field]: checked, [dateField]: newDate })
      .eq("id", r.id);
    if (error) {
      setErr(error.message);
      load(); // reload on error
    }
  };

  const ca = rows.reduce((s, r) => s + Number(r.amount), 0);
  const marge = rows.reduce((s, r) => s + Number(r.marge), 0);
  const taux = ca ? ((100 * marge) / ca).toFixed(1) : "0";

  return (
    <div className="min-h-screen bg-muted p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Lianzhou CRM</h1>
          <div className="text-sm text-muted-foreground">
            {session?.user.email}
            <Button variant="ghost" size="sm" onClick={signOut} className="ml-2">Déconnexion</Button>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-4"><div className="text-xs uppercase text-muted-foreground">CA total</div><div className="text-2xl font-bold">${fmt(ca)}</div></Card>
          <Card className="p-4"><div className="text-xs uppercase text-muted-foreground">Marge brute</div><div className="text-2xl font-bold text-emerald-700">${fmt(marge)}</div></Card>
          <Card className="p-4"><div className="text-xs uppercase text-muted-foreground">Taux de marge</div><div className="text-2xl font-bold">{taux}%</div></Card>
        </div>

        {loading && <p>Chargement…</p>}
        {err && <p className="text-red-600">Erreur : {err}</p>}
        {!loading && !err && (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>CDE</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Factory</TableHead>
                  <TableHead className="text-right">Marge</TableHead>
                  <TableHead>Terms</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-center">Client payé</TableHead>
                  <TableHead className="text-center">Fourn. payé</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.invoice_number}</TableCell>
                    <TableCell>{r.cde}</TableCell>
                    <TableCell className="text-right">{fmt(Number(r.amount))}</TableCell>
                    <TableCell className="text-right">{r.factory_inv ? fmt(Number(r.factory_inv)) : "—"}</TableCell>
                    <TableCell className="text-right font-semibold text-emerald-700">{fmt(Number(r.marge))}</TableCell>
                    <TableCell>{r.gmt_terms}</TableCell>
                    <TableCell>{r.due_date ?? "—"}</TableCell>
                    <TableCell>Client: {r.client_paye ? "payé" : "—"} · Fourn: {r.fournisseur_paye ? "payé" : "—"}</TableCell>
                    <TableCell className="text-center">
                      <Checkbox
                        checked={r.client_paye}
                        onCheckedChange={(v) => togglePaye(r, "client_paye", v === true)}
                        aria-label="Client payé"
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Checkbox
                        checked={r.fournisseur_paye}
                        onCheckedChange={(v) => togglePaye(r, "fournisseur_paye", v === true)}
                        aria-label="Fournisseur payé"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>
    </div>
  );
}
