import { useEffect, useState } from "react";
import { useAuth, signInWithGoogle } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const [allowed, setAllowed] = useState<null | boolean>(null);

  useEffect(() => {
    if (!session) { setAllowed(null); return; }
    supabase.from("crm_membres").select("email")
      .eq("email", session.user.email).maybeSingle()
      .then(({ data }) => {
        if (!data) { supabase.auth.signOut(); setAllowed(false); }
        else setAllowed(true);
      });
  }, [session]);

  if (loading) return <div className="p-10 text-center">Chargement…</div>;

  if (!session)
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="bg-background border rounded-xl p-10 text-center max-w-sm">
          <h1 className="text-xl font-semibold mb-2">Lianzhou — Espace privé</h1>
          <p className="text-muted-foreground text-sm mb-6">Accès réservé. Connexion requise.</p>
          <Button onClick={signInWithGoogle} className="w-full">Se connecter avec Google</Button>
        </div>
      </div>
    );

  if (allowed === null) return <div className="p-10 text-center">Vérification…</div>;

  if (allowed === false)
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="bg-background border rounded-xl p-10 text-center max-w-sm">
          <h1 className="text-xl font-semibold mb-2">Accès refusé</h1>
          <p className="text-muted-foreground text-sm">Accès refusé à cet espace.</p>
        </div>
      </div>
    );

  return <>{children}</>;
}
