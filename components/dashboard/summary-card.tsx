"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface SummaryCardProps {
  title: string;
  value: string;
  description: string;
  icon: any; // Using 'any' for the core-icon object
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
  iconClassName?: string;
  loading?: boolean;
}

export function SummaryCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
  iconClassName,
  loading,
}: SummaryCardProps) {
  if (loading) {
    return (
      <Card className={cn("shadow-sm", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            <Skeleton className="h-4 w-28" />
          </CardTitle>
          <div className={cn("p-2 rounded-lg bg-secondary", iconClassName)}>
            <Skeleton className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-36 mb-2" />
          <Skeleton className="h-4 w-48" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-lg bg-secondary", iconClassName)}>
          <HugeiconsIcon icon={icon} size={20} className="text-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          {trend && (
            <span className={cn(
              "font-medium",
              trend.isPositive ? "text-primary" : "text-destructive"
            )}>
              {trend.isPositive ? "+" : "-"}{trend.value}
            </span>
          )}
          {description}
        </p>
      </CardContent>
    </Card>
  );
}