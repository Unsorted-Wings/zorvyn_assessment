"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { 
  ChartBarBigIcon, 
  TickDouble02Icon, 
  AlertCircleIcon,
  ArrowUp01Icon,
  ArrowDown01Icon
} from "@hugeicons/core-free-icons";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/context/DataContext";
import { Skeleton } from "@/components/ui/skeleton";

export function InsightsPanel() {
  const { isHydrated } = useData();
  return (
    <Card className="shadow-sm border-none">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Smart Insights</CardTitle>
        <CardDescription>AI-powered observations of your habits.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isHydrated ? (
          <div className="space-y-3">
            <div className="h-16 rounded-xl bg-muted animate-pulse" />
            <div className="h-20 rounded-xl bg-muted animate-pulse" />
            <div className="h-16 rounded-xl bg-muted animate-pulse" />
          </div>
        ) : (
          <>
            {/* Insight 1: Highest Spending */}
            <div className="flex items-start gap-4 p-4 rounded-xl border bg-primary/10">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <HugeiconsIcon icon={ChartBarBigIcon} size={20} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold">Highest Spending Category</p>
                <p className="text-xs text-muted-foreground">
                  You spent <span className="font-bold text-foreground">$1,200</span> on 
                  <span className="font-bold text-foreground"> Housing</span> this month.
                </p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-destructive mt-1 uppercase">
                  <HugeiconsIcon icon={ArrowUp01Icon} size={12} />
                  <span>15% more than last month</span>
                </div>
              </div>
            </div>

            {/* Insight 2: Savings Goal Progress */}
            <div className="space-y-3 p-4 rounded-xl border bg-primary/10">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={TickDouble02Icon} size={18} className="text-primary" />
                  <p className="text-sm font-semibold">Monthly Savings Goal</p>
                </div>
                <span className="text-xs font-bold text-primary">75%</span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-[11px] text-muted-foreground">
                You are <span className="font-bold text-foreground">$500</span> away from your $2,000 goal.
              </p>
            </div>

            {/* Insight 3: Useful Observation */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
              <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
                <HugeiconsIcon icon={AlertCircleIcon} size={20} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-destructive">Subscription Alert</p>
                <p className="text-xs text-destructive/80 leading-relaxed">
                  We noticed 3 duplicate streaming subscriptions. Canceling these could save you 
                  <span className="font-bold"> $45/month</span>.
                </p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}