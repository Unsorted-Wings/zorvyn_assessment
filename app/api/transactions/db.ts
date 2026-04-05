type Transaction = {
  id: string;
  date: string;
  category: string;
  amount: number;
  type: "income" | "expense";
};

let DB: Transaction[] = [
  { id: "1", date: "2024-03-20", category: "Salary", amount: 4500, type: "income" },
  { id: "2", date: "2024-03-19", category: "Groceries", amount: 120, type: "expense" },
  { id: "3", date: "2024-03-18", category: "Rent", amount: 1200, type: "expense" },
  { id: "4", date: "2024-03-15", category: "Dining", amount: 85, type: "expense" },
];

export function getAll() {
  return DB;
}

export function add(tx: Omit<Transaction, "id">) {
  const newTx: Transaction = { id: Math.random().toString(36).substr(2, 9), ...tx };
  DB.unshift(newTx);
  return newTx;
}

export function removeById(id: string) {
  DB = DB.filter((t) => t.id !== id);
}

export function updateById(id: string, patch: Partial<Transaction>) {
  const idx = DB.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  DB[idx] = { ...DB[idx], ...patch };
  return DB[idx];
}
