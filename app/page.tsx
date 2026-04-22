import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  return (
    <>
      <AppHeader title="Início" />
      <main className="flex-1 p-6">
        <Card className="overflow-hidden">
          <div className="h-1 w-full bg-primary" />
          <div className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Info className="h-4 w-4 text-foreground" />
              <h2 className="text-base font-semibold">Objetivo do ambiente</h2>
            </div>

            <p className="mb-3 text-sm text-foreground">
              Este site privado simula o comportamento de componentes da
              biblioteca <strong>shadcn/ui</strong> para validação do WT.
            </p>
            <p className="mb-5 text-sm text-foreground">
              Para testar o fluxo principal de cadastro e consulta, navegue no
              menu lateral em <strong>Módulos e Registros &gt; Registros</strong>{" "}
              ou clique no botão abaixo.
            </p>

            <Button asChild>
              <Link href="/operacoes-demandas/demandas">
                <ArrowRight className="mr-2 h-4 w-4" />
                Ir para página de teste
              </Link>
            </Button>
          </div>
        </Card>
      </main>
    </>
  );
}
