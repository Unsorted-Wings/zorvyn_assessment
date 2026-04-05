"use client";

import { RoleProvider } from "@/context/RoleContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RoleProvider>
        <TooltipProvider>
          <ThemeProvider
           attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </TooltipProvider>
    </RoleProvider>
  );
}