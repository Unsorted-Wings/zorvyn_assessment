"use client";

import React, { useState, useMemo } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  PlusSignIcon, 
  Search01Icon, 
  FilterIcon,
  Tick01Icon,
  Cancel01Icon,
  MoneyReceiveCircleIcon,
  MoneySendCircleIcon,
  Delete02Icon
} from "@hugeicons/core-free-icons";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRole } from "@/context/RoleContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const INITIAL_DATA = [
  { id: "1", date: "2024-03-20", category: "Salary", amount: 4500, type: "income" },
  { id: "2", date: "2024-03-19", category: "Groceries", amount: 120, type: "expense" },
];

export function TransactionsTable() {
  const { role } = useRole();
  const [transactions, setTransactions] = useState(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // --- Inline Adding State ---
  const [isAdding, setIsAdding] = useState(false);
  const [newTx, setNewTx] = useState({
    date: new Date().toISOString().split('T')[0],
    category: "",
    amount: "",
    type: "expense"
  });

  const handleAddRow = () => {
    if (!newTx.category || !newTx.amount) return;
    
    const preparedTx = {
      id: Math.random().toString(36).substr(2, 9),
      ...newTx,
      amount: parseFloat(newTx.amount)
    };

    setTransactions([preparedTx, ...transactions]);
    setIsAdding(false);
    setNewTx({ date: new Date().toISOString().split('T')[0], category: "", amount: "", type: "expense" });
  };

  const filteredData = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch = t.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "all" || t.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [transactions, search, categoryFilter]);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <div>
          <CardTitle className="text-xl font-bold">Recent Transactions</CardTitle>
          <CardDescription>Directly manage your ledger below.</CardDescription>
        </div>
        
        {role === "admin" && !isAdding && (
          <Button size="sm" className="gap-2" onClick={() => setIsAdding(true)}>
            <HugeiconsIcon icon={PlusSignIcon} size={18} />
            <span>Add Transaction</span>
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <HugeiconsIcon icon={Search01Icon} size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-10 h-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="rounded-xl border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-37.5">Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="w-35">Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                {role === "admin" && <TableHead className="w-25 text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* --- THE INLINE ADD ROW --- */}
              {isAdding && role === "admin" && (
                <TableRow className="bg-primary/5 animate-in fade-in slide-in-from-top-1 duration-200">
                  <TableCell>
                    <Input 
                      type="date" 
                      className="h-8 text-xs" 
                      value={newTx.date} 
                      onChange={(e) => setNewTx({...newTx, date: e.target.value})}
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      placeholder="e.g. Rent" 
                      className="h-8 text-xs" 
                      value={newTx.category}
                      onChange={(e) => setNewTx({...newTx, category: e.target.value})}
                      autoFocus
                    />
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={newTx.type} 
                      onValueChange={(val) => setNewTx({...newTx, type: val as any})}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      className="h-8 text-xs text-right" 
                      value={newTx.amount}
                      onChange={(e) => setNewTx({...newTx, amount: e.target.value})}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-primary hover:bg-primary/10" onClick={handleAddRow}>
                        <HugeiconsIcon icon={Tick01Icon} size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => setIsAdding(false)}>
                        <HugeiconsIcon icon={Cancel01Icon} size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Existing Data */}
              {filteredData.map((t) => (
                <TableRow key={t.id}>
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
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                        <HugeiconsIcon icon={Delete02Icon} size={14} />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}