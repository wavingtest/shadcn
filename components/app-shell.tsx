"use client";

import * as React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/app-sidebar";
import { cn } from "@/lib/utils";

type ShellContextValue = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
};

const ShellContext = React.createContext<ShellContextValue | null>(null);

export function useAppShell() {
  return React.useContext(ShellContext);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const toggleSidebar = React.useCallback(() => {
    setSidebarOpen((open) => !open);
  }, []);

  const value = React.useMemo(
    () => ({ sidebarOpen, setSidebarOpen, toggleSidebar }),
    [sidebarOpen, toggleSidebar]
  );

  return (
    <ShellContext.Provider value={value}>
      <TooltipProvider delayDuration={200}>
        <div className="flex min-h-screen">
          <div
            className={cn(
              "transition-[margin,width] duration-200 ease-linear",
              sidebarOpen ? "flex w-64 shrink-0" : "flex w-16 shrink-0"
            )}
          >
            <AppSidebar collapsed={!sidebarOpen} />
          </div>
          <div className="flex min-w-0 flex-1 flex-col">{children}</div>
        </div>
      </TooltipProvider>
    </ShellContext.Provider>
  );
}
