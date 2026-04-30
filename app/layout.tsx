import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "WT Private • shadcn/ui",
  description:
    "Ambiente privado simulando componentes da biblioteca shadcn/ui para validação do WT.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        suppressHydrationWarning
        className="min-h-screen bg-slate-50 text-foreground antialiased"
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
