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

const chartData = [
  { month: "January", balance: 4500 },
  { month: "February", balance: 5200 },
  { month: "March", balance: 4800 },
  { month: "April", balance: 6100 },
  { month: "May", balance: 5900 },
  { month: "June", balance: 8200 },
];

const chartConfig = {
  balance: {
    label: "Balance",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function BalanceTrend() {
  return (
    <Card className="col-span-1 lg:col-span-4 shadow-sm">
      <CardHeader>
        <CardTitle>Balance Trend</CardTitle>
        <CardDescription>Visualizing your net worth growth</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}