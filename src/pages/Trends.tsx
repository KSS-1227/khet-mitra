import { useEffect, useMemo, useState } from "react";
import { setPageMeta } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TrendingUp, ArrowUpRight, ArrowDownRight, Minus, Calendar, Filter, Search, Globe2 } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
import { useToast } from "@/components/ui/use-toast";

// Helper types
// type Trend = "up" | "down" | "stable";

// Sample data (placeholder; replace with live API later)
const trendingCrops = [
  {
    id: "tomato",
    name: "Tomato",
    category: "Vegetables",
    price: 28,
    unit: "kg",
    change7d: 12,
    trend: "up",
    demand: "High",
    regions: ["Maharashtra", "Karnataka"],
    data: [
      { day: "Mon", price: 24 },
      { day: "Tue", price: 25 },
      { day: "Wed", price: 26 },
      { day: "Thu", price: 27 },
      { day: "Fri", price: 28 },
      { day: "Sat", price: 29 },
      { day: "Sun", price: 28 },
    ],
  },
  {
    id: "onion",
    name: "Onion",
    category: "Vegetables",
    price: 22,
    unit: "kg",
    change7d: -5,
    trend: "down",
    demand: "Medium",
    regions: ["Gujarat", "Maharashtra"],
    data: [
      { day: "Mon", price: 25 },
      { day: "Tue", price: 24 },
      { day: "Wed", price: 23 },
      { day: "Thu", price: 23 },
      { day: "Fri", price: 22 },
      { day: "Sat", price: 22 },
      { day: "Sun", price: 22 },
    ],
  },
  {
    id: "wheat",
    name: "Wheat",
    category: "Grains",
    price: 2150,
    unit: "quintal",
    change7d: 2,
    trend: "stable",
    demand: "High",
    regions: ["Punjab", "UP"],
    data: [
      { day: "Mon", price: 2100 },
      { day: "Tue", price: 2125 },
      { day: "Wed", price: 2130 },
      { day: "Thu", price: 2140 },
      { day: "Fri", price: 2150 },
      { day: "Sat", price: 2145 },
      { day: "Sun", price: 2150 },
    ],
  },
];

const opportunities = [
  {
    id: "green-chilli",
    name: "Green Chilli",
    price: 60,
    unit: "kg",
    shortage: 40,
    profitPotential: 60,
    difficulty: 2,
    timeToHarvest: 90,
  },
  {
    id: "turmeric",
    name: "Turmeric",
    price: 78,
    unit: "kg",
    shortage: 35,
    profitPotential: 45,
    difficulty: 3,
    timeToHarvest: 180,
  },
  {
    id: "pomegranate",
    name: "Pomegranate",
    price: 120,
    unit: "kg",
    shortage: 25,
    profitPotential: 40,
    difficulty: 3,
    timeToHarvest: 150,
  },
];

const exportOpps = [
  {
    id: "mango-uae",
    crop: "Alphonso Mango",
    country: "UAE",
    flag: "🇦🇪",
    exportPrice: 180,
    domesticPrice: 90,
    demandTons: 500,
    season: "Mar-Jun",
    quality: ["Grade A", "Residue-free"],
  },
  {
    id: "banana-eu",
    crop: "Cavendish Banana",
    country: "EU",
    flag: "🇪🇺",
    exportPrice: 55,
    domesticPrice: 28,
    demandTons: 1200,
    season: "Year-round",
    quality: ["Organic cert.", "Proper packing"],
  },
];

const categories = ["All", "Vegetables", "Fruits", "Grains", "Cash Crops"];

export default function Trends() {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setPageMeta({
      title: "Market Intelligence | Khet-Mitra",
      description: "Real-time market trends, supply-demand gaps, and export opportunities for smarter crop decisions.",
      canonical: location.href,
    });
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const dateStr = useMemo(
    () => new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    []
  );

  const filteredTrending = useMemo(() => {
    return trendingCrops.filter((c) => {
      const byCategory = category === "All" || c.category === category;
      const byQuery = !query || c.name.toLowerCase().includes(query.toLowerCase());
      return byCategory && byQuery;
    });
  }, [category, query]);

  const handleAlert = (name: string) =>
    toast({ title: "Price alert set", description: `${name} price alert created. We'll notify you on changes.` });
  const handleBuyers = (name: string) =>
    toast({ title: "Find buyers", description: `We will match buyers for ${name}. Coming soon.` });

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex items-start justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <TrendingUp className="size-5 text-primary" />
            Market Intelligence
          </h1>
          <p className="text-sm text-muted-foreground">Make smart farming decisions with real-time market data</p>
        </div>
        <div className="text-xs text-muted-foreground">Updated: {dateStr}</div>
      </header>

      {/* Search + Filters */}
      <section aria-label="Filters" className="flex flex-col gap-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search crop (e.g., Tomato)"
              className="pl-9"
              aria-label="Search crop"
            />
          </div>
          <Button variant="secondary" aria-label="Open filters">
            <Filter className="size-4" />
          </Button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Crop categories">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={category === cat ? "default" : "secondary"}
              size="sm"
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className="whitespace-nowrap"
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      {/* Section 1: Trending Now */}
      <section aria-labelledby="trending-heading" className="space-y-3">
        <div
          className="rounded-xl p-4 text-primary-foreground"
          style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.8))" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🔥 What's Trending in Market Today</span>
          </div>
        </div>

        {loading ? (
          <div className="flex gap-3 overflow-x-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-[280px] shrink-0">
                <Skeleton className="h-40 w-full rounded-lg" />
                <div className="mt-2 space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {filteredTrending.map((crop) => (
              <Card key={crop.id} className="w-[280px] shrink-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>{crop.name}</span>
                    <Badge variant="secondary">{crop.demand} demand</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="h-40 w-full overflow-hidden rounded-md bg-muted">
                    {/* Placeholder image box; replace with crop image */}
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={crop.data} margin={{ left: 4, right: 4, top: 8, bottom: 0 }}>
                        <defs>
                          <linearGradient id={`grad-${crop.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="day" hide />
                        <YAxis hide />
                        <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))" }} />
                        <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" fill={`url(#grad-${crop.id})`} strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">Current price</div>
                      <div className="text-lg font-semibold">₹{crop.price} / {crop.unit}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">7-day change</div>
                      <div className="flex items-center justify-end gap-1 font-medium">
                        {crop.trend === "up" && <ArrowUpRight className="size-4 text-primary" />}
                        {crop.trend === "down" && <ArrowDownRight className="size-4 text-destructive" />}
                        {crop.trend === "stable" && <Minus className="size-4 text-muted-foreground" />}
                        <span>{crop.change7d > 0 ? "+" : ""}{crop.change7d}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="flex-1" variant="secondary">Learn More</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>{crop.name} - Price Trend</DialogTitle>
                          <DialogDescription>Last 7 days price movement and regional demand</DialogDescription>
                        </DialogHeader>
                        <div className="h-56">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={crop.data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                              <XAxis dataKey="day" />
                              <YAxis />
                              <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))" }} />
                              <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="text-sm text-muted-foreground">Best regions: {crop.regions.join(", ")}</div>
                      </DialogContent>
                    </Dialog>
                    <Button className="flex-1" onClick={() => handleAlert(crop.name)}>Set Price Alert</Button>
                  </div>

                  <Button variant="link" className="px-0" onClick={() => handleBuyers(crop.name)}>
                    Find Buyers
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Section 2: High Demand, Low Supply */}
      <section aria-labelledby="opps-heading" className="space-y-3">
        <div
          className="rounded-xl p-4"
          style={{ background: "linear-gradient(180deg, hsl(var(--warning, 45 100% 50%) / 0.15), transparent)" }}
        >
          <div className="flex items-center gap-2 font-semibold">⚡ High Demand, Low Supply - Golden Opportunities</div>
          <p className="text-sm text-muted-foreground">Crops with supply shortage - Higher profit potential</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-40 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {opportunities.map((o) => (
              <Card key={o.id}>
                <CardHeader className="py-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm font-semibold">{o.name}</CardTitle>
                    <Badge variant="destructive">HOT OPPORTUNITY</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div>Market price</div>
                    <div className="font-medium">₹{o.price} / {o.unit}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Supply shortage</span>
                      <span className="font-medium">{o.shortage}%</span>
                    </div>
                    <Progress value={o.shortage} aria-label="Supply shortage" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="rounded-md border p-2 text-center">
                      <div className="text-muted-foreground">Profit</div>
                      <div className="font-semibold">{o.profitPotential}%</div>
                    </div>
                    <div className="rounded-md border p-2 text-center">
                      <div className="text-muted-foreground">Difficulty</div>
                      <div className="font-semibold">{"★".repeat(o.difficulty)}{"☆".repeat(5 - o.difficulty)}</div>
                    </div>
                    <div className="rounded-md border p-2 text-center">
                      <div className="text-muted-foreground">Harvest</div>
                      <div className="flex items-center justify-center gap-1 font-semibold">
                        <Calendar className="size-3" /> {o.timeToHarvest}d
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="secondary" className="w-full mt-1">Check if suitable</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Section 3: Export Opportunities */}
      <section aria-labelledby="export-heading" className="space-y-3">
        <div
          className="rounded-xl p-4"
          style={{ background: "linear-gradient(180deg, hsl(var(--accent)) / 0.15, transparent)" }}
        >
          <div className="flex items-center gap-2 font-semibold">
            🌍 Export Opportunities - International Markets
            <Badge variant="secondary" className="ml-2">Export Partner Program</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Crops in high demand abroad - Premium prices guaranteed</p>
        </div>

        {loading ? (
          <div className="flex gap-3 overflow-x-auto">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-44 w-[300px] rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {exportOpps.map((e) => (
              <Card key={e.id} className="w-[300px] shrink-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Globe2 className="size-4 text-primary" />
                    {e.flag} {e.crop} → {e.country}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-md border p-2 text-center">
                      <div className="text-muted-foreground">Export Price</div>
                      <div className="font-semibold">₹{e.exportPrice} / kg</div>
                    </div>
                    <div className="rounded-md border p-2 text-center">
                      <div className="text-muted-foreground">Domestic</div>
                      <div className="font-semibold">₹{e.domesticPrice} / kg</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">Annual demand: {e.demandTons} tons</div>
                  <div className="text-sm text-muted-foreground">Season: {e.season}</div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {e.quality.map((q) => (
                      <Badge key={q} variant="outline">{q}</Badge>
                    ))}
                  </div>
                  <Button className="w-full mt-1">Connect with Export Partner</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Section 4: Personalized Recommendations */}
      <section aria-labelledby="personalized-heading" className="space-y-3">
        <div className="rounded-xl border p-4">
          <div className="font-semibold">Recommended for Your Farm</div>
          <p className="text-sm text-muted-foreground">
            Based on your location, climate and farm profile. Fine-tuned recommendations will appear here.
          </p>
        </div>

        {/* Example personalized cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: "rec-1", crop: "Tomato (Hybrid)", score: 92, yield: "25 quintals/acre", investment: "₹30,000", link: "#" },
            { id: "rec-2", crop: "Green Chilli", score: 88, yield: "18 quintals/acre", investment: "₹24,000", link: "#" },
          ].map((r) => (
            <Card key={r.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>{r.crop}</span>
                  <Badge variant="secondary">{r.score}% match</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="rounded-md border p-2 text-center">
                    <div className="text-muted-foreground">Suitability</div>
                    <div className="font-semibold">{r.score}%</div>
                  </div>
                  <div className="rounded-md border p-2 text-center">
                    <div className="text-muted-foreground">Expected yield</div>
                    <div className="font-semibold">{r.yield}</div>
                  </div>
                  <div className="rounded-md border p-2 text-center">
                    <div className="text-muted-foreground">Investment</div>
                    <div className="font-semibold">{r.investment}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">Start Planning</Button>
                  <Button className="flex-1" variant="secondary">Growing Guide</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer quick actions */}
      <section className="flex gap-2 pt-2">
        <Button variant="secondary" className="flex-1">Save Opportunities</Button>
        <Button className="flex-1">Download Report</Button>
      </section>
    </div>
  );
}
