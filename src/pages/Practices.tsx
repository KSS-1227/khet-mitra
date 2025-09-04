import React from "react";
import { Leaf, IndianRupee, Star, Clock, TrendingUp } from "lucide-react";
import { setPageMeta } from "@/lib/seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

type BudgetTierSimple = "low" | "medium" | "high";

type Practice = {
  id: string;
  name: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  investment: [number, number];
  expectedIncrease: number; // percent
  category: string;
  suitable: string;
  why: string;
  steps: string[];
  budgets: BudgetTierSimple[];
};

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
}

export default function Practices() {
  const [budgetTier, setBudgetTier] = React.useState<"low" | "medium" | "high" | "custom">("medium");
  const [customBudget, setCustomBudget] = React.useState<number>(15000);
  const { toast } = useToast();

  React.useEffect(() => {
    setPageMeta({
      title: "Smart Farming Practices | Productivity",
      description: "Budget-based recommendations, modern techniques, guides and ROI tools to boost farm productivity.",
      canonical: window.location.href,
    });
  }, []);

  const budgetLabel = React.useMemo(() => {
    switch (budgetTier) {
      case "low":
        return "₹1,000 - ₹10,000";
      case "medium":
        return "₹10,000 - ₹50,000";
      case "high":
        return "₹50,000+";
      case "custom":
        return formatINR(customBudget);
    }
  }, [budgetTier, customBudget]);

  const practices: Practice[] = [
    {
      id: "compost",
      name: "Organic Compost Making",
      difficulty: "Beginner",
      investment: [1000, 5000],
      expectedIncrease: 15,
      category: "Soil Health",
      suitable: "All crops",
      why: "Improves soil structure and fertility using farm waste.",
      steps: [
        "Collect green and brown waste", "Layer with soil and moisture", "Turn pile weekly", "Ready in 6-8 weeks"
      ],
      budgets: ["low", "medium"],
    },
    {
      id: "drip-basic",
      name: "Basic Drip Irrigation",
      difficulty: "Intermediate",
      investment: [12000, 40000],
      expectedIncrease: 20,
      category: "Water Management",
      suitable: "Vegetables & Fruits",
      why: "Reduces water use and delivers nutrients efficiently.",
      steps: [
        "Map field & rows", "Lay mainline & laterals", "Install filter & venturi", "Test and adjust pressure"
      ],
      budgets: ["medium", "high"],
    },
    {
      id: "solar-pump",
      name: "Solar Water Pump",
      difficulty: "Advanced",
      investment: [45000, 150000],
      expectedIncrease: 0,
      category: "Water Management",
      suitable: "All irrigated farms",
      why: "Lowers recurring electricity/diesel cost for pumping.",
      steps: [
        "Assess head & discharge", "Site panels south-facing", "Install controller", "Connect to irrigation"
      ],
      budgets: ["high"],
    },
    {
      id: "vermi",
      name: "Vermicomposting Unit",
      difficulty: "Beginner",
      investment: [8000, 20000],
      expectedIncrease: 10,
      category: "Soil Health",
      suitable: "All crops",
      why: "Produces nutrient-rich compost and liquid extract.",
      steps: [
        "Build shaded bed", "Add cow dung bedding", "Introduce worms", "Feed and harvest vermi-compost"
      ],
      budgets: ["medium"],
    },
    {
      id: "ipm",
      name: "Integrated Pest Management (IPM)",
      difficulty: "Intermediate",
      investment: [3000, 15000],
      expectedIncrease: 12,
      category: "Pest Control",
      suitable: "Most crops",
      why: "Combines traps, bio-controls, and monitoring to cut losses.",
      steps: ["Scout weekly", "Use pheromone traps", "Release bio-agents", "Targeted sprays only if needed"],
      budgets: ["low", "medium"],
    },
  ];

  const filteredByBudget = practices.filter((p) => {
    if (budgetTier === "custom") return customBudget >= p.investment[0];
    return p.budgets.includes(budgetTier as BudgetTierSimple);
  });

  // ROI calculator state
  const [yieldPerAcre, setYieldPerAcre] = React.useState<number>(20);
  const [pricePerUnit, setPricePerUnit] = React.useState<number>(2000);
  const [currentCost, setCurrentCost] = React.useState<number>(30000);
  const [investment, setInvestment] = React.useState<number>(15000);
  const [expectedIncrease, setExpectedIncrease] = React.useState<number>(20);
  const [timelineMonths, setTimelineMonths] = React.useState<number>(12);

  const outputs = React.useMemo(() => {
    const extraYield = (yieldPerAcre * expectedIncrease) / 100;
    const extraRevenuePerCycle = extraYield * pricePerUnit;
    const cyclesPerYear = 2; // assumption
    const annualExtra = extraRevenuePerCycle * cyclesPerYear;
    const annualROI = annualExtra - 0; // no extra recurring considered in v1
    const threeYearROI = annualROI * 3 - investment;
    const monthlyExtra = annualExtra / 12;
    const breakEvenMonths = Math.max(1, Math.ceil(investment / Math.max(1, monthlyExtra)));
    const riskScore = Math.max(1, 100 - expectedIncrease + (investment > 40000 ? 10 : 0));
    return { annualExtra, threeYearROI, breakEvenMonths, monthlyExtra, riskScore };
  }, [yieldPerAcre, pricePerUnit, expectedIncrease, investment]);

  const sectionClass = "space-y-4";

  return (
    <>
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex items-center justify-between py-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Leaf className="size-6 text-primary" aria-hidden /> Smart Farming Practices
            </h1>
            <p className="text-sm text-muted-foreground">
              Boost your farm productivity with proven techniques
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="whitespace-nowrap">My Budget: {budgetLabel}</Badge>
            <Select value={budgetTier} onValueChange={(v: any) => setBudgetTier(v)}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Select Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low (₹1k - ₹10k)</SelectItem>
                <SelectItem value="medium">Medium (₹10k - ₹50k)</SelectItem>
                <SelectItem value="high">High (₹50k+)</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {budgetTier === "custom" && (
          <div className="container pb-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Set Custom Budget</CardTitle>
                <CardDescription>Drag the slider to choose your budget</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-4">
                  <IndianRupee className="size-4 text-muted-foreground" />
                  <Slider value={[customBudget]} onValueChange={(v) => setCustomBudget(v[0])} min={1000} max={200000} step={500} />
                  <Input
                    className="w-32"
                    type="number"
                    value={customBudget}
                    onChange={(e) => setCustomBudget(Number(e.target.value || 0))}
                    aria-label="Custom budget"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </header>

      <main className="container py-6 space-y-10">
        {/* Section 1: Budget-Based Recommendations */}
        <section aria-labelledby="budget-recos" className={sectionClass}>
          <div className="flex items-center justify-between">
            <div>
              <h2 id="budget-recos" className="text-xl font-bold">Budget-Based Recommendations</h2>
              <p className="text-sm text-muted-foreground">Tailored practices for your current investment level</p>
            </div>
            <Badge className="hidden md:inline-flex">Most Popular</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Low */}
            <Card className="border-primary/40">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Low Budget</CardTitle>
                  <Badge variant="secondary">₹1k - ₹10k</Badge>
                </div>
                <CardDescription>Smart farming on a shoestring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Organic compost from farm waste</li>
                  <li>DIY drip using bottles</li>
                  <li>Companion planting</li>
                  <li>Natural pest control</li>
                </ul>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <TrendingUp className="size-4" /> Expected ROI: 10-25% in 3-6 months
                </div>
              </CardContent>
            </Card>

            {/* Medium */}
            <Card className="border-info/40">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Medium Budget</CardTitle>
                  <Badge variant="secondary">₹10k - ₹50k</Badge>
                </div>
                <CardDescription>Moderate investment, high returns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Basic drip irrigation</li>
                  <li>Vermicomposting unit</li>
                  <li>Soil test & nutrients</li>
                  <li>Bio-fertilizers & quality seeds</li>
                </ul>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <TrendingUp className="size-4" /> Expected ROI: 20-40% in 6-12 months
                </div>
              </CardContent>
            </Card>

            {/* High */}
            <Card className="border-accent/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">High Budget</CardTitle>
                  <Badge variant="secondary">₹50k+</Badge>
                </div>
                <CardDescription>Advanced technologies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Automated irrigation</li>
                  <li>Poly/Greenhouse</li>
                  <li>Soil sensors & monitoring</li>
                  <li>Advanced pest systems</li>
                </ul>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <TrendingUp className="size-4" /> Expected ROI: 25-60% in 12-24 months
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations filtered by chosen budget */}
          <div className="space-y-3">
            <h3 className="font-semibold">Recommended for your budget</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredByBudget.map((p) => (
                <Card key={p.id} className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{p.name}</CardTitle>
                      <Badge variant="outline">{p.difficulty}</Badge>
                    </div>
                    <CardDescription>{p.category} • {p.suitable}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <IndianRupee className="size-4" />
                      <span>Investment: {formatINR(p.investment[0])} - {formatINR(p.investment[1])}</span>
                    </div>
                    <div className="text-sm">Expected productivity increase: +{p.expectedIncrease}%</div>
                    <div className="text-sm text-muted-foreground">Why it works: {p.why}</div>
                    <div className="space-y-1">
                      <div className="text-xs font-medium">Implementation steps</div>
                      <ol className="list-decimal pl-5 text-sm space-y-1">
                        {p.steps.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ol>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => toast({ title: "Added to your plan", description: `${p.name} saved to your implementation list.` })}>Add to My Plan</Button>
                      <Button size="sm" variant="outline">Learn More</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Modern Farming Techniques */}
        <section aria-labelledby="techniques" className={sectionClass}>
          <h2 id="techniques" className="text-xl font-bold">Modern Farming Techniques</h2>
          <p className="text-sm text-muted-foreground">Water, soil, pest, precision and sustainable practices</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {practices.map((p) => (
              <Card key={p.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{p.name}</CardTitle>
                    <Badge variant="outline">{p.difficulty}</Badge>
                  </div>
                  <CardDescription>{p.category} • {p.suitable}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <img src="/placeholder.svg" loading="lazy" alt={`${p.name} technique illustration`} className="w-full h-32 object-cover rounded-md" />
                  <div className="flex items-center gap-2 text-sm">
                    <IndianRupee className="size-4" />
                    <span>₹{p.investment[0].toLocaleString()} - ₹{p.investment[1].toLocaleString()}</span>
                  </div>
                  <div className="text-sm">Expected yield increase: +{p.expectedIncrease}%</div>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="details">
                      <AccordionTrigger>Why and how it works</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground mb-2">{p.why}</p>
                        <ol className="list-decimal pl-5 text-sm space-y-1">
                          {p.steps.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => toast({ title: "Added to your plan", description: `${p.name} saved to your implementation list.` })}>Add to My Plan</Button>
                    <Button size="sm" variant="outline">Learn More</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Section 3: Success Stories */}
        <section aria-labelledby="success" className={sectionClass}>
          <div className="flex items-center justify-between">
            <h2 id="success" className="text-xl font-bold">Success Stories & Results</h2>
            <Button variant="outline" size="sm">Share Your Story</Button>
          </div>
          <div className="overflow-x-auto">
            <div className="flex gap-4 min-w-max py-1">
              {[1,2,3,4].map((i) => (
                <Card key={i} className="w-72 flex-shrink-0">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Rajesh from Punjab</CardTitle>
                      <Badge variant="secondary">2 acres</Badge>
                    </div>
                    <CardDescription>Drip irrigation • Invested ₹15,000</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <img src="/placeholder.svg" loading="lazy" alt="Before and after field photos" className="w-full h-28 object-cover rounded" />
                    <div className="flex items-center gap-2">
                      <Star className="size-4 text-primary" /> 40% water savings
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="size-4 text-primary" /> 30% yield increase
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 text-muted-foreground" /> Recovered in 8 months
                    </div>
                    <Button size="sm" variant="outline">Contact Rajesh</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Step-by-Step Guides */}
        <section aria-labelledby="guides" className={sectionClass}>
          <h2 id="guides" className="text-xl font-bold">Step-by-Step Implementation Guides</h2>
          <Accordion type="single" collapsible className="mt-2">
            <AccordionItem value="w1">
              <AccordionTrigger>Week 1: Planning & Preparation</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Soil testing and analysis</li>
                  <li>Material procurement list</li>
                  <li>Site preparation requirements</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="w2">
              <AccordionTrigger>Week 2-4: Installation/Setup</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Step-by-step installation photos</li>
                  <li>Common mistakes to avoid</li>
                  <li>Troubleshooting tips</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="m2">
              <AccordionTrigger>Month 2-3: Monitoring & Adjustment</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Performance monitoring methods</li>
                  <li>Adjustment techniques</li>
                  <li>Maintenance schedule</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="m4">
              <AccordionTrigger>Month 4+: Results & Optimization</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Result measurement techniques</li>
                  <li>Further optimization opportunities</li>
                  <li>Scaling up considerations</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Section 5: ROI Calculator */}
        <section aria-labelledby="roi" className={sectionClass}>
          <h2 id="roi" className="text-xl font-bold">ROI Calculator & Planning Tools</h2>
          <Card className="mt-2">
            <CardHeader>
              <CardTitle className="text-base">Estimate your returns</CardTitle>
              <CardDescription>Enter your farm details to see ROI</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 items-center">
                  <label className="text-sm text-muted-foreground">Yield per acre (units)</label>
                  <Input type="number" value={yieldPerAcre} onChange={(e) => setYieldPerAcre(Number(e.target.value||0))} />
                </div>
                <div className="grid grid-cols-2 gap-2 items-center">
                  <label className="text-sm text-muted-foreground">Market price per unit (₹)</label>
                  <Input type="number" value={pricePerUnit} onChange={(e) => setPricePerUnit(Number(e.target.value||0))} />
                </div>
                <div className="grid grid-cols-2 gap-2 items-center">
                  <label className="text-sm text-muted-foreground">Current production costs (₹)</label>
                  <Input type="number" value={currentCost} onChange={(e) => setCurrentCost(Number(e.target.value||0))} />
                </div>
                <div className="grid grid-cols-2 gap-2 items-center">
                  <label className="text-sm text-muted-foreground">Proposed investment (₹)</label>
                  <Input type="number" value={investment} onChange={(e) => setInvestment(Number(e.target.value||0))} />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Expected yield increase: {expectedIncrease}%</label>
                  <Slider value={[expectedIncrease]} onValueChange={(v) => setExpectedIncrease(v[0])} min={0} max={100} step={1} />
                </div>
                <div className="grid grid-cols-2 gap-2 items-center">
                  <label className="text-sm text-muted-foreground">Implementation timeline (months)</label>
                  <Input type="number" value={timelineMonths} onChange={(e) => setTimelineMonths(Number(e.target.value||0))} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 items-center">
                  <span className="text-sm">Break-even timeline</span>
                  <span className="text-sm font-medium">{outputs.breakEvenMonths} months</span>
                </div>
                <div className="grid grid-cols-2 gap-2 items-center">
                  <span className="text-sm">Monthly cash flow impact</span>
                  <span className="text-sm font-medium">{formatINR(Math.round(outputs.monthlyExtra))}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 items-center">
                  <span className="text-sm">Total ROI over 3 years</span>
                  <span className="text-sm font-medium">{formatINR(Math.round(outputs.threeYearROI))}</span>
                </div>
                <div>
                  <span className="text-sm">Risk assessment</span>
                  <Progress value={100 - outputs.riskScore} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">Lower bar = higher risk. Consider phased investment if risk feels high.</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => toast({ title: "Plan created", description: "We added a draft plan with reminders." })}>Create My Implementation Plan</Button>
                  <Button variant="outline">Download Report</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
