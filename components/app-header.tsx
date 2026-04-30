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

export function AppHeader({
  title,
  showSidebarTrigger = true,
}: {
  title: string;
  showSidebarTrigger?: boolean;
}) {
  const shell = useAppShell();

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-white px-6">
      {showSidebarTrigger && shell ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
          aria-label={
            shell.sidebarOpen
              ? "Ocultar menu lateral"
              : "Mostrar menu lateral"
          }
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
        <h1 className="truncate text-lg font-semibold">{title}</h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2"
            aria-label="Abrir menu do usuário simulado"
          >
            <User className="h-4 w-4 shrink-0" />
            WT Test User
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel>Conta sandbox</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => {}} disabled>
            Perfil (simulado)
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => {}} disabled>
            Preferências (simulado)
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => {}} disabled>
            Sair (simulado)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
