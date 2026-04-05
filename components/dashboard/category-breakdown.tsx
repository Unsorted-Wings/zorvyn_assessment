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

const chartData = [
  { category: "housing", amount: 1200, fill: "var(--color-housing)" },
  { category: "food", amount: 800, fill: "var(--color-food)" },
  { category: "transport", amount: 400, fill: "var(--color-transport)" },
  { category: "other", amount: 250, fill: "var(--color-other)" },
];

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
  const totalAmount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  return (
    <Card className="col-span-1 lg:col-span-3 flex flex-col shadow-sm">
      <CardHeader className="items-start pb-0">
        <CardTitle>Spending Breakdown</CardTitle>
        <CardDescription>Top categories this month</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
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
      </CardContent>
    </Card>
  );
}