"use client";

import { useState, useMemo } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignIcon,
  Search01Icon,
  FilterIcon,
  Tick01Icon,
  Cancel01Icon,
  Delete02Icon,
  Sorting05Icon,
  ArrowUp01Icon,
  ArrowDown01Icon
} from "@hugeicons/core-free-icons";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRole } from "@/context/RoleContext";
import { useData } from "@/context/DataContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";


export function TransactionsTable() {
  const { role } = useRole();
  const { transactions, addTransaction, deleteTransaction, search, setSearch, categoryFilter, setCategoryFilter, sortConfig, setSortConfig, isHydrated } = useData();

  // --- Inline Adding State ---
  const [isAdding, setIsAdding] = useState(false);
  const [newTx, setNewTx] = useState({
    date: new Date().toISOString().split('T')[0],
    category: "",
    amount: "",
    type: "expense" as "income" | "expense"
  });

  // --- Handlers ---
  const handleDelete = (id: string) => {
    deleteTransaction(id);
  };

  const handleAddRow = () => {
    if (!newTx.category || !newTx.amount) return;
    addTransaction({ date: newTx.date, category: newTx.category, amount: parseFloat(newTx.amount), type: newTx.type });
    setIsAdding(false);
    setNewTx({ date: new Date().toISOString().split('T')[0], category: "", amount: "", type: "expense" });
  };

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null;
    }
    setSortConfig({ key, direction });
  };

  // --- Computed Data (Filter + Sort) ---
  const processedData = useMemo(() => {
    let items = [...transactions].filter((t) => {
      const matchesSearch = t.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "all" || t.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });

    if (sortConfig.direction !== null) {
      items.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return items;
  }, [transactions, search, categoryFilter, sortConfig]);

  // Helper to render sort icon
  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key || sortConfig.direction === null) return Sorting05Icon;
    return sortConfig.direction === 'asc' ? ArrowUp01Icon : ArrowDown01Icon;
  };

  return (
    <Card className="shadow-sm border-none bg-card text-card-foreground overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <div>
          <CardTitle className="text-xl font-bold">Recent Transactions</CardTitle>
          <CardDescription>Click headers to sort or use filters to narrow results.</CardDescription>
        </div>
        {role === "admin" && !isAdding && (
          <Button size="sm" className="gap-2" onClick={() => setIsAdding(true)}>
            <HugeiconsIcon icon={PlusSignIcon} size={18} />
            <span>Add Transaction</span>
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Filters Row */}
        {!isHydrated ? (
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-1"><div className="animate-pulse h-10 rounded-3xl bg-muted" /></div>
              <div className="w-40"><div className="animate-pulse h-10 rounded-3xl bg-muted" /></div>
            </div>
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="p-6 space-y-2">
                {[0, 1, 2, 3].map((i) => <div key={i} className="h-8 bg-muted rounded-md animate-pulse" />)}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <HugeiconsIcon icon={Search01Icon} size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search category..."
                  className="pl-10 bg-muted/50 border-none h-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-45 bg-muted/50 border-none h-10">
                  <HugeiconsIcon icon={FilterIcon} size={16} className="mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Salary">Salary</SelectItem>
                  <SelectItem value="Groceries">Groceries</SelectItem>
                  <SelectItem value="Rent">Rent</SelectItem>
                  <SelectItem value="Dining">Dining</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-xl border border-border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="w-37.5 cursor-pointer hover:text-foreground transition-colors" onClick={() => requestSort('date')}>
                      <div className="flex items-center gap-2">
                        Date <HugeiconsIcon icon={getSortIcon('date')} size={14} className={sortConfig.key === 'date' && sortConfig.direction ? "text-primary" : "text-muted-foreground"} />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:text-foreground" onClick={() => requestSort('category')}>
                      <div className="flex items-center gap-2">
                        Category <HugeiconsIcon icon={getSortIcon('category')} size={14} className={sortConfig.key === 'category' && sortConfig.direction ? "text-primary" : "text-muted-foreground"} />
                      </div>
                    </TableHead>
                    <TableHead className="w-35 cursor-pointer hover:text-foreground" onClick={() => requestSort('type')}>
                      <div className="flex items-center gap-2">
                        Type <HugeiconsIcon icon={getSortIcon('type')} size={14} className={sortConfig.key === 'type' && sortConfig.direction ? "text-primary" : "text-muted-foreground"} />
                      </div>
                    </TableHead>
                    <TableHead className="text-right cursor-pointer hover:text-foreground" onClick={() => requestSort('amount')}>
                      <div className="flex items-center justify-end gap-2">
                        Amount <HugeiconsIcon icon={getSortIcon('amount')} size={14} className={sortConfig.key === 'amount' && sortConfig.direction ? "text-primary" : "text-muted-foreground"} />
                      </div>
                    </TableHead>
                    {role === "admin" && <TableHead className="w-20 text-right">Action</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Inline Add Row */}
                  {isAdding && role === "admin" && (
                    <TableRow className="bg-primary/5 animate-in fade-in slide-in-from-top-1 duration-200">
                      <TableCell><Input type="date" className="h-8 text-xs" value={newTx.date} onChange={(e) => setNewTx({ ...newTx, date: e.target.value })} /></TableCell>
                      <TableCell><Input placeholder="Category" className="h-8 text-xs" value={newTx.category} onChange={(e) => setNewTx({ ...newTx, category: e.target.value })} autoFocus /></TableCell>
                      <TableCell>
                        <Select value={newTx.type} onValueChange={(val) => setNewTx({ ...newTx, type: val as any })}>
                          <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="income">Income</SelectItem>
                            <SelectItem value="expense">Expense</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell><Input type="number" placeholder="0.00" className="h-8 text-xs text-right" value={newTx.amount} onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })} /></TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-primary" onClick={handleAddRow}><HugeiconsIcon icon={Tick01Icon} size={16} /></Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => setIsAdding(false)}><HugeiconsIcon icon={Cancel01Icon} size={16} /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}

                  {processedData.length > 0 ? (
                    processedData.map((t) => (
                      <TableRow key={t.id} className="hover:bg-accent/50 transition-colors group">
                        <TableCell className="text-muted-foreground text-sm">{t.date}</TableCell>
                        <TableCell className="font-medium">{t.category}</TableCell>
                        <TableCell>
                          <Badge variant={t.type === "income" ? "default" : "secondary"} className="capitalize text-[10px]">
                            {t.type}
                          </Badge>
                        </TableCell>
                        <TableCell className={`text-right font-bold ${t.type === "income" ? "text-primary" : "text-foreground"}`}>
                          {t.type === "income" ? "+" : "-"}${t.amount.toLocaleString()}
                        </TableCell>
                        {role === "admin" && (
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:cursor-pointer"
                              onClick={() => handleDelete(t.id)}
                            >
                              <HugeiconsIcon icon={Delete02Icon} size={14} />
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={role === "admin" ? 5 : 4} className="h-32 text-center text-muted-foreground">
                        No transactions found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </>
        )}
        </CardContent>
    </Card>
  );
}