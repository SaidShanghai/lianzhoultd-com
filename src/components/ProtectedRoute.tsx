import { useAuth, signInWithGoogle } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
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
  return <>{children}</>;
}
