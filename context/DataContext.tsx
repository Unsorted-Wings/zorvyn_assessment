"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Transaction = {
  id: string;
  date: string; // YYYY-MM-DD
  category: string;
  amount: number;
  type: "income" | "expense";
};

type SortConfig = { key: string; direction: "asc" | "desc" | null };

interface DataContextType {
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, patch: Partial<Transaction>) => void;
  setTransactions: (tx: Transaction[]) => void;
  // UI state (persisted)
  search: string;
  setSearch: (s: string) => void;
  categoryFilter: string;
  setCategoryFilter: (s: string) => void;
  sortConfig: SortConfig;
  setSortConfig: (c: SortConfig) => void;
  // hydration for UI skeletons
  isHydrated: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const LOCAL_KEY = "zorvyn.transactions.v1";
const LOCAL_UI_KEY = "zorvyn.ui.v1";

const DEFAULT_TRANSACTIONS: Transaction[] = [
  { id: "1", date: "2024-03-20", category: "Salary", amount: 4500, type: "income" },
  { id: "2", date: "2024-03-19", category: "Groceries", amount: 120, type: "expense" },
  { id: "3", date: "2024-03-18", category: "Rent", amount: 1200, type: "expense" },
  { id: "4", date: "2024-03-15", category: "Dining", amount: 85, type: "expense" },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [transactions, setStateTransactions] = useState<Transaction[]>(() => {
    try {
      if (typeof window === "undefined") return DEFAULT_TRANSACTIONS;
      const raw = localStorage.getItem(LOCAL_KEY);
      return raw ? JSON.parse(raw) : DEFAULT_TRANSACTIONS;
    } catch {
      return DEFAULT_TRANSACTIONS;
    }
  });

  const DEFAULT_UI = {
    search: "",
    categoryFilter: "all",
    sortConfig: { key: "date", direction: null } as SortConfig,
  };

  const [search, setSearch] = useState<string>(() => {
    try {
      if (typeof window === "undefined") return DEFAULT_UI.search;
      const raw = localStorage.getItem(LOCAL_UI_KEY);
      return raw ? JSON.parse(raw).search ?? DEFAULT_UI.search : DEFAULT_UI.search;
    } catch {
      return DEFAULT_UI.search;
    }
  });

  const [categoryFilter, setCategoryFilter] = useState<string>(() => {
    try {
      if (typeof window === "undefined") return DEFAULT_UI.categoryFilter;
      const raw = localStorage.getItem(LOCAL_UI_KEY);
      return raw ? JSON.parse(raw).categoryFilter ?? DEFAULT_UI.categoryFilter : DEFAULT_UI.categoryFilter;
    } catch {
      return DEFAULT_UI.categoryFilter;
    }
  });

  const [sortConfig, setSortConfig] = useState<SortConfig>(() => {
    try {
      if (typeof window === "undefined") return DEFAULT_UI.sortConfig;
      const raw = localStorage.getItem(LOCAL_UI_KEY);
      return raw ? JSON.parse(raw).sortConfig ?? DEFAULT_UI.sortConfig : DEFAULT_UI.sortConfig;
    } catch {
      return DEFAULT_UI.sortConfig;
    }
  });

  // used to show polished skeletons/animations briefly while the app hydrates
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  React.useEffect(() => {
    const t = setTimeout(() => setIsHydrated(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(transactions));
    } catch {}
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_UI_KEY, JSON.stringify({ search, categoryFilter, sortConfig }));
    } catch {}
  }, [search, categoryFilter, sortConfig]);

  const addTransaction = (tx: Omit<Transaction, "id">) => {
    const newTx: Transaction = { id: Math.random().toString(36).substr(2, 9), ...tx };
    setStateTransactions((prev) => [newTx, ...prev]);
  };

  const deleteTransaction = (id: string) => setStateTransactions((prev) => prev.filter((t) => t.id !== id));

  const updateTransaction = (id: string, patch: Partial<Transaction>) =>
    setStateTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));

  return (
    <DataContext.Provider value={{
      transactions,
      addTransaction,
      deleteTransaction,
      updateTransaction,
      setTransactions: setStateTransactions,
      search,
      setSearch,
      categoryFilter,
      setCategoryFilter,
      sortConfig,
      setSortConfig,
      isHydrated,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within a DataProvider");
  return ctx;
}
