import { useState } from "react";
import {
  TrendingUp, TrendingDown, Minus, DollarSign,
  Wheat, Apple, Beef, Coffee, BarChart3, RefreshCw
} from "lucide-react";

const COMMODITIES = [
  { name: "Maize", unit: "per kg", price: 0.42, change: +3.2, trend: "up" as const, region: "East Africa", icon: "🌽" },
  { name: "Wheat", unit: "per kg", price: 0.58, change: -1.5, trend: "down" as const, region: "Global", icon: "🌾" },
  { name: "Rice", unit: "per kg", price: 0.75, change: +0.8, trend: "up" as const, region: "Asia", icon: "🍚" },
  { name: "Coffee (Arabica)", unit: "per kg", price: 8.20, change: +5.4, trend: "up" as const, region: "Global", icon: "☕" },
  { name: "Tea", unit: "per kg", price: 3.15, change: -0.3, trend: "down" as const, region: "Kenya", icon: "🍵" },
  { name: "Tomatoes", unit: "per kg", price: 1.80, change: +2.1, trend: "up" as const, region: "Local", icon: "🍅" },
  { name: "Onions", unit: "per kg", price: 0.95, change: 0, trend: "stable" as const, region: "Local", icon: "🧅" },
  { name: "Potatoes", unit: "per kg", price: 0.60, change: +1.2, trend: "up" as const, region: "Local", icon: "🥔" },
  { name: "Soybeans", unit: "per kg", price: 1.10, change: +4.1, trend: "up" as const, region: "Global", icon: "🫘" },
  { name: "Cotton", unit: "per kg", price: 2.30, change: -2.0, trend: "down" as const, region: "Global", icon: "☁️" },
  { name: "Beef", unit: "per kg", price: 6.50, change: +1.8, trend: "up" as const, region: "Local", icon: "🥩" },
  { name: "Chicken", unit: "per kg", price: 3.80, change: +0.5, trend: "up" as const, region: "Local", icon: "🐔" },
  { name: "Eggs", unit: "per dozen", price: 2.40, change: -0.8, trend: "down" as const, region: "Local", icon: "🥚" },
  { name: "Milk", unit: "per liter", price: 1.20, change: +0.2, trend: "up" as const, region: "Local", icon: "🥛" },
  { name: "Avocado", unit: "per kg", price: 2.80, change: +6.3, trend: "up" as const, region: "Kenya", icon: "🥑" },
  { name: "Banana", unit: "per kg", price: 0.55, change: +0.1, trend: "stable" as const, region: "Local", icon: "🍌" },
  { name: "Sugar", unit: "per kg", price: 0.90, change: -1.2, trend: "down" as const, region: "Global", icon: "🍬" },
  { name: "Sunflower Oil", unit: "per liter", price: 2.10, change: +3.5, trend: "up" as const, region: "East Africa", icon: "🌻" },
];

const CATEGORIES = ["All", "Grains", "Fruits & Vegetables", "Livestock", "Cash Crops"];

function getCategory(name: string): string {
  if (["Maize", "Wheat", "Rice", "Soybeans"].includes(name)) return "Grains";
  if (["Tomatoes", "Onions", "Potatoes", "Avocado", "Banana"].includes(name)) return "Fruits & Vegetables";
  if (["Beef", "Chicken", "Eggs", "Milk"].includes(name)) return "Livestock";
  return "Cash Crops";
}

export default function MarketPrices() {
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"name" | "price" | "change">("name");

  const filtered = COMMODITIES.filter((c) =>
    category === "All" || getCategory(c.name) === category
  ).sort((a, b) => {
    if (sortBy === "price") return b.price - a.price;
    if (sortBy === "change") return b.change - a.change;
    return a.name.localeCompare(b.name);
  });

  const TrendIcon = ({ trend }: { trend: string }) => {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === "down") return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-[var(--color-muted-foreground)]" />;
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-foreground)] font-mono flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-green-600" />
              Market Price Dashboard
            </h1>
            <p className="text-[var(--color-muted-foreground)] mt-2 font-mono text-sm">
              Reference commodity prices for agriculture planning and market analysis
            </p>
          </div>
          <button
            onClick={() => {}}
            className="flex items-center gap-2 px-3 py-2 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg font-mono text-xs hover:bg-[var(--color-muted)] transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            Refresh
          </button>
        </div>

        {/* Price Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <TrendingUp className="w-4 h-4 text-green-600 mx-auto mb-1" />
            <p className="text-lg font-bold font-mono text-green-800">
              {COMMODITIES.filter((c) => c.trend === "up").length}
            </p>
            <p className="text-[10px] font-mono text-green-600">Rising</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
            <TrendingDown className="w-4 h-4 text-red-500 mx-auto mb-1" />
            <p className="text-lg font-bold font-mono text-red-700">
              {COMMODITIES.filter((c) => c.trend === "down").length}
            </p>
            <p className="text-[10px] font-mono text-red-500">Falling</p>
          </div>
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-3 text-center">
            <Minus className="w-4 h-4 text-[var(--color-muted-foreground)] mx-auto mb-1" />
            <p className="text-lg font-bold font-mono text-[var(--color-foreground)]">
              {COMMODITIES.filter((c) => c.trend === "stable").length}
            </p>
            <p className="text-[10px] font-mono text-[var(--color-muted-foreground)]">Stable</p>
          </div>
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-3 text-center">
            <DollarSign className="w-4 h-4 text-amber-600 mx-auto mb-1" />
            <p className="text-lg font-bold font-mono text-[var(--color-foreground)]">{COMMODITIES.length}</p>
            <p className="text-[10px] font-mono text-[var(--color-muted-foreground)]">Tracked</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg border font-mono text-xs transition-colors ${
                  category === cat
                    ? "bg-green-100 border-green-300 text-green-800"
                    : "bg-[var(--color-card)] border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-1.5 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg font-mono text-xs text-[var(--color-foreground)]"
          >
            <option value="name">Sort: Name</option>
            <option value="price">Sort: Price ↓</option>
            <option value="change">Sort: Change ↓</option>
          </select>
        </div>

        {/* Price Table */}
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl overflow-hidden">
          <div className="grid grid-cols-12 gap-2 p-3 border-b border-[var(--color-border)] font-mono text-xs font-bold text-[var(--color-muted-foreground)]">
            <div className="col-span-5">Commodity</div>
            <div className="col-span-2 text-right">Price (USD)</div>
            <div className="col-span-2 text-right">24h Change</div>
            <div className="col-span-3">Region</div>
          </div>
          {filtered.map((item) => (
            <div
              key={item.name}
              className="grid grid-cols-12 gap-2 p-3 border-b border-[var(--color-border)] last:border-b-0 hover:bg-[var(--color-muted)] transition-colors items-center"
            >
              <div className="col-span-5 flex items-center gap-2">
                <span className="text-lg">{item.icon}</span>
                <span className="font-mono text-sm text-[var(--color-foreground)]">{item.name}</span>
              </div>
              <div className="col-span-2 text-right font-mono text-sm font-bold text-[var(--color-foreground)]">
                ${item.price.toFixed(2)}
                <span className="text-[10px] text-[var(--color-muted-foreground)] ml-1">{item.unit}</span>
              </div>
              <div className="col-span-2 flex items-center justify-end gap-1">
                <TrendIcon trend={item.trend} />
                <span
                  className={`font-mono text-sm ${
                    item.change > 0
                      ? "text-green-600"
                      : item.change < 0
                      ? "text-red-500"
                      : "text-[var(--color-muted-foreground)]"
                  }`}
                >
                  {item.change > 0 ? "+" : ""}{item.change.toFixed(1)}%
                </span>
              </div>
              <div className="col-span-3 font-mono text-xs text-[var(--color-muted-foreground)]">
                {item.region}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 font-mono text-xs text-amber-800">
          <strong>Note:</strong> These are reference prices for educational purposes. Actual market prices vary by region,
          season, quality, and market conditions. Use these as a baseline for crop planning and ROI calculations.
        </div>
      </div>
    </div>
  );
}
