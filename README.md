# Financial Dashboard — Zorvyn Assessment

This repository contains a small, client-driven financial dashboard built with Next.js (App Router). It demonstrates a shared, persistent data layer, local mock API, responsive UI components, charts, and polished loading states.

**Quick start**

Prerequisites: Node.js 18+ and npm.

Install and run locally:

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

Build for production:

```bash
npm run build
npm run start
```

**Overview of the approach**

- Shared client-side data layer: `context/DataContext.tsx` provides `DataProvider` and `useData()` to components. It stores transactions and UI state (search, filter, sort).
- Persistence: UI and transaction data persist to `localStorage` using keys `zorvyn.transactions.v1` and `zorvyn.ui.v1`.
- Mock API: `app/api/transactions` contains an in-memory mock REST API (GET, POST, DELETE, PATCH). The client syncs with this mock API on mount (toggleable via `USE_API` in `DataContext.tsx`).
- UX polish: skeleton components and subtle entrance animations were added to cards and charts to improve perceived performance while the app hydrates.

**Features**

- Summary cards: current balance, monthly income, monthly expenses. Values derive from the shared transactions state.
- Charts: balance trend (cumulative) and category breakdown (expenses) built with `recharts`.
- Transactions table: add, delete, search, category filter, and column sort. UI state for search, filter, and sort is persisted and shared across components.
- Roles: `RoleContext` toggles between `admin` and `viewer` — `admin` can add/delete transactions.
- Mock API: in-memory endpoints for quick integration testing during development; resets when the dev server restarts.

**Important files**

- `context/DataContext.tsx` — shared data + UI state, localStorage persistence, and mock-API sync.
- `components/layout/Providers.tsx` — wraps the app with `DataProvider` and other providers.
- `components/transaction/transaction-table.tsx` — table UI with filters, sort, add/delete.
- `components/dashboard/*` — `summary-card.tsx`, `balance-trend.tsx`, `category-breakdown.tsx`.
- `app/api/transactions/*` — mock API and in-memory DB.

**Mock API endpoints**

- `GET /api/transactions` — returns all transactions
- `POST /api/transactions` — create a transaction (body contains { date, category, amount, type })
- `DELETE /api/transactions/:id` — delete transaction
- `PATCH /api/transactions/:id` — update transaction fields

Note: The mock DB is in-memory (see `app/api/transactions/db.ts`) and will reset when you restart the development server.

**Runtime flags and persistence**

- Toggle server sync: set `USE_API` in `context/DataContext.tsx` to `true` (default) or `false` to disable mock-API calls and work purely with `localStorage`.
- Reset stored data in the browser console:

```js
localStorage.removeItem('zorvyn.transactions.v1')
localStorage.removeItem('zorvyn.ui.v1')
```

**Development notes**

- The app uses the Next.js App Router and React 19.
- Charts use `recharts` and are driven from the shared transaction list.
- UI skeletons live in `components/ui/skeleton.tsx` and are used across cards and charts while `DataContext` sets `isHydrated`.

If you'd like, I can:

- Replace client mock API with a file-backed store so data survives server restarts.
- Convert shared state to a zustand store and keep the same persistence and API integrations.
- Add import/export (JSON) UI for transactions.

---

Updated README to reflect setup, architecture, and features.
