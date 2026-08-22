import { useQuery, useMutation } from "@/lib/convex-react-safe";
import { api } from "../convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { ShoppingBag, Star, Lock, Check } from "lucide-react";

export default function Store() {
  const { user } = useAuth(); const userId = user?._id;
  const items = useQuery(api.store.listItems, {});
  const purchases = useQuery(api.store.myPurchases, userId ? { userId } : "skip");
  const userStats = useQuery(api.gamification.myStats);
  const purchaseMutation = useMutation(api.store.purchase);
  const [category, setCategory] = useState<string | null>(null);
  const [purchasing, setPurchasing] = useState<string | null>(null);

  const categories = ["badge", "theme", "unlock", "avatar", "title"];
  const filtered = items?.filter((i) => !category || i.category === category);
  const ownedIds = new Set(purchases?.map((p) => p.itemId));

  const handlePurchase = async (itemId: string) => {
    if (!userId) return;
    setPurchasing(itemId);
    try {
      await purchaseMutation({ userId, itemId: itemId as any });
    } catch (e: any) {
      alert(e.message);
    }
    setPurchasing(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Store</h1>
            <p className="text-muted-foreground font-mono text-sm">Spend your earned points on rewards</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <Star className="w-5 h-5 text-amber-500" />
            <span className="font-mono font-bold text-amber-600">{userStats?.points ?? 0}</span>
            <span className="text-xs text-muted-foreground font-mono">pts</span>
          </div>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          <button onClick={() => setCategory(null)}
            className={`px-3 py-1.5 rounded text-sm font-mono ${!category ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}>
            All
          </button>
          {categories.map((c) => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded text-sm font-mono capitalize ${category === c ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}>
              {c}s
            </button>
          ))}
        </div>

        {!items ? (
          <div className="text-center py-12 text-muted-foreground font-mono">Loading store...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered?.map((item) => {
              const owned = ownedIds.has(item._id);
              const canAfford = (userStats?.points ?? 0) >= item.pricePoints;
              return (
                <div key={item._id} className={`border rounded-lg p-4 bg-card transition-colors ${owned ? "border-green-500/50" : "border-border hover:border-green-500/30"}`}>
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1 font-mono text-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500" />
                      {item.pricePoints} pts
                    </div>
                    {owned ? (
                      <span className="flex items-center gap-1 text-xs text-green-600 font-mono">
                        <Check className="w-3.5 h-3.5" /> Owned
                      </span>
                    ) : (
                      <button
                        onClick={() => handlePurchase(item._id)}
                        disabled={!canAfford || purchasing === item._id}
                        className={`px-3 py-1 rounded text-xs font-mono ${
                          canAfford
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                        }`}
                      >
                        {purchasing === item._id ? "..." : canAfford ? "Buy" : "Need more pts"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
