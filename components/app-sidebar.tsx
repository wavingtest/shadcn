"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Package,
  Wrench,
  UserCog,
  Settings,
  ChevronDown,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SubItem = { label: string; icon: LucideIcon };
type MenuItem = {
  label: string;
  icon: LucideIcon;
  children?: SubItem[];
};

const menu: MenuItem[] = [
  {
    label: "Início",
    icon: LayoutDashboard,
  },
  {
    label: "Módulos e Registros",
    icon: ClipboardList,
    children: [
      { label: "Registros", icon: ClipboardList },
      { label: "Pessoas", icon: Users },
      { label: "Pacotes", icon: Package },
      { label: "Ferramentas", icon: Wrench },
    ],
  },
  {
    label: "Cadastros",
    icon: Users,
    children: [],
  },
  {
    label: "Equipe",
    icon: UserCog,
    children: [],
  },
  {
    label: "Configurações",
    icon: Settings,
    children: [],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState<Record<string, boolean>>({
    "Módulos e Registros": true,
  });

  const toggle = (label: string) =>
    setOpen((s) => ({ ...s, [label]: !s[label] }));

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r bg-white">
      <div className="flex items-center gap-2 border-b px-4 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
          WT
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold leading-none">WT Private</span>
          <span className="text-xs text-muted-foreground">shadcn/ui</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-2">
        <ul className="flex flex-col gap-1">
          {menu.map((item) => {
            const Icon = item.icon;
            const hasChildren = item.children && item.children.length > 0;
            const isInicioActive = item.label === "Início" && pathname === "/";
            const isParentActive =
              item.label === "Módulos e Registros" &&
              pathname.startsWith("/operacoes-demandas");

            if (!hasChildren) {
              const isInicioItem = item.label === "Início";
              return (
                <li key={item.label}>
                  {isInicioItem ? (
                    <Link
                      href="/"
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                        isInicioActive
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-accent"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  )}
                </li>
              );
            }

            const isOpen = open[item.label] ?? isParentActive ?? false;

            return (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => toggle(item.label)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    isParentActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </span>
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4 shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 shrink-0" />
                  )}
                </button>

                {isOpen && item.children!.length > 0 && (
                  <ul className="mt-1 flex flex-col gap-1 pl-6 pr-2">
                    {item.children!.map((sub, index) => {
                      const SubIcon = sub.icon;
                      const isSubActive =
                        item.label === "Módulos e Registros" &&
                        index === 0 &&
                        pathname === "/operacoes-demandas/demandas";
                      const isDemandasItem =
                        item.label === "Módulos e Registros" &&
                        sub.label === "Registros";
                      return (
                        <li key={`${item.label}-${sub.label}`}>
                          {isDemandasItem ? (
                            <Link
                              href="/operacoes-demandas/demandas"
                              className={cn(
                                "flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-sm transition-colors",
                                isSubActive
                                  ? "bg-primary text-primary-foreground"
                                  : "text-foreground hover:bg-accent"
                              )}
                            >
                              <SubIcon className="h-3.5 w-3.5 shrink-0" />
                              <span className="truncate">{sub.label}</span>
                            </Link>
                          ) : (
                            <button
                              type="button"
                              className={cn(
                                "flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-sm transition-colors",
                                isSubActive
                                  ? "bg-primary text-primary-foreground"
                                  : "text-foreground hover:bg-accent"
                              )}
                            >
                              <SubIcon className="h-3.5 w-3.5 shrink-0" />
                              <span className="truncate">{sub.label}</span>
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t px-4 py-3 text-xs text-muted-foreground">
        Sandbox de validação WT
      </div>
    </aside>
  );
}
