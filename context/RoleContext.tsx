"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Role = "admin" | "viewer";

interface RoleContextType {
  role: Role;
  toggleRole: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("admin");

  const toggleRole = () => {
    setRole((prev) => (prev === "admin" ? "viewer" : "admin"));
  };

  return (
    <RoleContext.Provider value={{ role, toggleRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) throw new Error("useRole must be used within a RoleProvider");
  return context;
}