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
import { useData } from "@/context/DataContext";

export default function DashboardPage() {
  const { transactions, isHydrated } = useData();

  const currentBalance = transactions.reduce((acc, t) => acc + (t.type === "income" ? t.amount : -t.amount), 0);
  const currentMonthKey = new Date().toISOString().slice(0, 7);
  const monthlyIncome = transactions
    .filter((t) => t.type === "income" && t.date.slice(0, 7) === currentMonthKey)
    .reduce((acc, t) => acc + t.amount, 0);
  const monthlyExpenses = transactions
    .filter((t) => t.type === "expense" && t.date.slice(0, 7) === currentMonthKey)
    .reduce((acc, t) => acc + t.amount, 0);

  const fmt = (n: number) => `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return (
    <div className="space-y-8 bg-b pb-10 max-w-7xl mx-auto">
      {/* 2. Summary Cards (3 columns) */}
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          title="Current Balance"
          value={fmt(currentBalance)}
          description="Updated just now"
          icon={Wallet02Icon}
          loading={!isHydrated}
        />
        <SummaryCard
          title="Monthly Income"
          value={fmt(monthlyIncome)}
          description="this month"
          icon={MoneyReceiveCircleIcon}
          trend={{ value: "", isPositive: true }}
          loading={!isHydrated}
        />
        <SummaryCard
          title="Monthly Expenses"
          value={fmt(monthlyExpenses)}
          description="this month"
          icon={MoneySendCircleIcon}
          trend={{ value: "", isPositive: false }}
          loading={!isHydrated}
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