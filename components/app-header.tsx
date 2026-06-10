"use client";

import { PanelLeft, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppShell } from "@/components/app-shell";
import { wtControl, wtLabel, wtName } from "@/lib/wt-test-attrs";

export function AppHeader({
  title,
  showSidebarTrigger = true,
}: {
  title: string;
  showSidebarTrigger?: boolean;
}) {
  const shell = useAppShell();

  return (
    <header
      {...wtControl("wt-header", "Cabeçalho da aplicação")}
      className="flex h-14 shrink-0 items-center gap-2 border-b bg-white px-6"
    >
      {showSidebarTrigger && shell ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
          {...wtControl(
            "wt-header-sidebar-toggle",
            shell.sidebarOpen ? "Ocultar menu lateral" : "Mostrar menu lateral",
            { aria: true }
          )}
          data-sidebar="trigger"
          onClick={shell.toggleSidebar}
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
      ) : null}

      <div className="flex min-w-0 flex-1 items-center gap-3">
        {showSidebarTrigger && shell ? (
          <Separator orientation="vertical" className="h-6 shrink-0" />
        ) : null}
        <h1 className="truncate text-lg font-semibold" {...wtLabel(title)}>
          {title}
        </h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2"
            {...wtControl("wt-header-menu-usuario", "Abrir menu do usuário simulado", {
              aria: true,
            })}
          >
            <User className="h-4 w-4 shrink-0" />
            WT Test User
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel>Conta sandbox</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Button
              {...wtControl("wt-dropdown-perfil", "Perfil (simulado)")}
              type="button"
              variant="ghost"
              className="h-auto w-full justify-start px-2 py-1.5 font-normal"
            >
              Perfil (simulado)
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button
              {...wtControl("wt-dropdown-preferencias", "Preferências (simulado)")}
              type="button"
              variant="ghost"
              className="h-auto w-full justify-start px-2 py-1.5 font-normal"
            >
              Preferências (simulado)
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Button
              {...wtControl("wt-dropdown-sair", "Sair (simulado)")}
              type="button"
              variant="ghost"
              className="h-auto w-full justify-start px-2 py-1.5 font-normal text-destructive hover:text-destructive"
            >
              Sair (simulado)
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
