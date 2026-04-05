"use client";

import { 
  Wallet02Icon, 
  MoneyReceiveCircleIcon, 
  MoneySendCircleIcon,
} from "@hugeicons/core-free-icons";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { BalanceTrend } from "@/components/dashboard/balance-trend";
import { CategoryBreakdown } from "@/components/dashboard/category-breakdown";
import { TransactionsTable } from "@/components/transaction/transaction-table";
import { InsightsPanel } from "@/components/insights/Insights-panel";

export default function DashboardPage() {
  return (
    <div className="space-y-8 bg-b pb-10 max-w-7xl mx-auto">
      {/* 1. Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold text-primary tracking-tight">Financial Overview</h2>
        <p className="text-muted-foreground">Detailed pulse of your spending and savings.</p>
      </div>

      {/* 2. Summary Cards (3 columns) */}
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          title="Current Balance"
          value="$5,430.75"
          description="Updated 1 hour ago"
          icon={Wallet02Icon}
        />
        <SummaryCard
          title="Monthly Income"
          value="$4,500.00"
          description="increase from last month"
          icon={MoneyReceiveCircleIcon}
          trend={{ value: "20%", isPositive: true }}
        />
        <SummaryCard
          title="Monthly Expenses"
          value="$2,150.25"
          description="increase from last month"
          icon={MoneySendCircleIcon}
          trend={{ value: "20%", isPositive: true }}
        />
      </div>

      {/* 3. Main Content Grid (12 columns for flexibility) */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
        
        {/* Left Side: Charts & Table (8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-8">
             {/* Re-using previous charts, adjusted for the new grid span */}
             <div className="lg:col-span-5"><BalanceTrend /></div>
             <div className="lg:col-span-3"><CategoryBreakdown /></div>
          </div>
          <TransactionsTable />
        </div>

        {/* Right Side: Insights (4 columns) */}
        <div className="lg:col-span-4 h-fit">
          <InsightsPanel />
        </div>

      </div>
    </div>
  );
}