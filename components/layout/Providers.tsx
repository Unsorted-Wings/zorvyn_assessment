"use client";

import { RoleProvider } from "@/context/RoleContext";
import { DataProvider } from "@/context/DataContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RoleProvider>
      <DataProvider>
        <TooltipProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </TooltipProvider>
      </DataProvider>
    </RoleProvider>
  );
}