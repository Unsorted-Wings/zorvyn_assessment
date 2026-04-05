    "use client";

    import * as React from "react";
    import { Label, Pie, PieChart } from "recharts";
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
      amount: {
        label: "Amount",
      },
      housing: {
        label: "Housing",
        color: "var(--chart-1)",
      },
      food: {
        label: "Food",
        color: "var(--chart-2)",
      },
      transport: {
        label: "Transport",
        color: "var(--chart-3)",
      },
      other: {
        label: "Other",
        color: "var(--chart-4)",
      },
    } satisfies ChartConfig;

    export function CategoryBreakdown() {
      const { transactions, isHydrated } = useData();

      const { chartData, totalAmount } = useMemo(() => {
        if (!transactions || transactions.length === 0) return { chartData: [], totalAmount: 0 };

        // pick current month; if none present, pick most recent month from transactions
        const currentKey = new Date().toISOString().slice(0, 7);
        let filtered = transactions.filter((t) => t.type === "expense" && t.date.slice(0, 7) === currentKey);
        if (filtered.length === 0) {
          const keys = Array.from(new Set(transactions.map((t) => t.date.slice(0, 7)))).sort();
          const lastKey = keys[keys.length - 1];
          filtered = transactions.filter((t) => t.type === "expense" && t.date.slice(0, 7) === lastKey);
        }

        const totals: Record<string, number> = {};
        for (const t of filtered) {
          totals[t.category] = (totals[t.category] || 0) + t.amount;
        }

        const palette = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];
        const data = Object.entries(totals)
          .sort((a, b) => b[1] - a[1])
          .map(([category, amount], idx) => ({ category, amount, fill: palette[idx % palette.length] }));

        const total = data.reduce((acc, d) => acc + d.amount, 0);
        return { chartData: data, totalAmount: total };
      }, [transactions]);

      return (
        <Card className="col-span-1 lg:col-span-3 flex flex-col shadow-sm">
          <CardHeader className="items-start pb-0">
            <CardTitle>Spending Breakdown</CardTitle>
            <CardDescription>Top categories this month</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            {!isHydrated ? (
              <div className="mx-auto w-full aspect-square h-62.5 flex items-center justify-center">
                <Skeleton className="h-60 w-60 rounded-full" />
              </div>
            ) : (
              <ChartContainer
                config={chartConfig}
                className="aspect-square mx-auto h-62.5"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={chartData}
                    dataKey="amount"
                    nameKey="category"
                    innerRadius={60}              
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-2xl font-bold"
                              >
                                ${totalAmount.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Total Spent
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      );
    }