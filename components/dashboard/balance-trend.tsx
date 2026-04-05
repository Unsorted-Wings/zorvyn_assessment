
  "use client";

  import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart";
  import { useMemo } from "react";
  import { useData } from "@/context/DataContext";
  import { Skeleton } from "@/components/ui/skeleton";

  const chartConfig = {
    balance: {
      label: "Balance",
      color: "var(--primary)",
    },
  } satisfies ChartConfig;

  export function BalanceTrend() {
    const { transactions, isHydrated } = useData();

    const chartData = useMemo(() => {
      const map = new Map<string, number>();
      const txs = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
      for (const t of txs) {
        const key = t.date.slice(0, 7); // YYYY-MM
        map.set(key, (map.get(key) || 0) + (t.type === "income" ? t.amount : -t.amount));
      }
      const keys = Array.from(map.keys()).sort();
      let cumulative = 0;
      return keys.map((k) => {
        cumulative += map.get(k) || 0;
        const [year, month] = k.split("-");
        const dt = new Date(Number(year), Number(month) - 1, 1);
        const label = dt.toLocaleString(undefined, { month: "short" });
        return { month: label, balance: cumulative };
      });
    }, [transactions]);

    return (
      <Card className="col-span-1 lg:col-span-4 shadow-sm">
        <CardHeader>
          <CardTitle>Balance Trend</CardTitle>
          <CardDescription>Visualizing your net worth growth</CardDescription>
        </CardHeader>
        <CardContent>
          {!isHydrated ? (
            <Skeleton className="h-62.5 w-full rounded-2xl" />
          ) : chartData.length === 0 ? (
            <div className="h-62.5 w-full flex flex-col items-center justify-center text-center text-muted-foreground px-4">
              <p className="text-sm font-medium">No transactions yet</p>
              <p className="text-xs mt-1">Add transactions to see your balance trend over time.</p>
            </div>
          ) : (
            <ChartContainer config={chartConfig} className="h-62.5 w-full">
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{ left: 12, right: 12, top: 10 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                  className="text-muted-foreground text-xs"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <defs>
                  <linearGradient id="fillBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-balance)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-balance)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="balance"
                  type="natural"
                  fill="url(#fillBalance)"
                  stroke="var(--color-balance)"
                  strokeWidth={2}
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    );
  }