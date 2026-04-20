"use client";

import * as React from "react";
import { ArrowUp, Plus, Search, X } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DemandaDrawer } from "./_components/demanda-drawer";

type SearchType = "demanda" | "cliente" | "sigla" | "gerente";
type OrderBy = "none" | "demanda" | "cliente" | "termino";

export type NewDemandaInput = {
  cliente: string;
  contrato: string;
  descricao: string;
  sigla: string;
  preposto: string;
  gerente: string;
  tipoServico: string;
  compartilhaProfissionais: boolean;
  metodologia: string;
};

type Demanda = {
  id: string;
  demanda: string;
  cliente: string;
  centroCusto: string;
  preposto: string;
  gerente: string;
  termino: string;
  sigla: string;
};

const searchTypes: Array<{ value: SearchType; label: string }> = [
  { value: "demanda", label: "Demanda" },
  { value: "cliente", label: "Cliente" },
  { value: "sigla", label: "Sigla" },
  { value: "gerente", label: "Gerente" },
];

const orderByOptions: Array<{ value: OrderBy; label: string }> = [
  { value: "none", label: "Sem ordenação" },
  { value: "demanda", label: "Demanda" },
  { value: "cliente", label: "Cliente" },
  { value: "termino", label: "Término" },
];

export default function DemandasPage() {
  const [open, setOpen] = React.useState(false);
  const [searchType, setSearchType] = React.useState<SearchType>("demanda");
  const [searchContentInput, setSearchContentInput] = React.useState("");
  const [searchContentApplied, setSearchContentApplied] = React.useState("");
  const [orderBy, setOrderBy] = React.useState<OrderBy>("none");
  const [sortAsc, setSortAsc] = React.useState(true);
  const [demandas, setDemandas] = React.useState<Demanda[]>([]);

  const handleCreateDemanda = React.useCallback((payload: NewDemandaInput) => {
    const now = new Date();
    const demanda: Demanda = {
      id: `${now.getTime()}`,
      demanda: payload.descricao,
      cliente: payload.cliente,
      centroCusto: payload.contrato,
      preposto: payload.preposto || "Preposto não informado",
      gerente: payload.gerente,
      termino: "Em aberto",
      sigla: payload.sigla,
    };

    setDemandas((prev) => [demanda, ...prev]);
  }, []);

  const handleBuscar = () => {
    setSearchContentApplied(searchContentInput.trim());
  };

  const handleLimpar = () => {
    setSearchType("demanda");
    setSearchContentInput("");
    setSearchContentApplied("");
    setOrderBy("none");
    setSortAsc(true);
  };

  const filteredDemandas = React.useMemo(() => {
    const term = searchContentApplied.toLowerCase();

    if (!term) {
      return demandas;
    }

    return demandas.filter((d) => {
      if (searchType === "demanda") {
        return d.demanda.toLowerCase().includes(term);
      }
      if (searchType === "cliente") {
        return d.cliente.toLowerCase().includes(term);
      }
      if (searchType === "sigla") {
        return d.sigla.toLowerCase().includes(term);
      }
      return d.gerente.toLowerCase().includes(term);
    });
  }, [demandas, searchContentApplied, searchType]);

  const displayedDemandas = React.useMemo(() => {
    const items = [...filteredDemandas];

    if (orderBy === "none") {
      return items;
    }

    items.sort((a, b) => {
      const aValue =
        orderBy === "demanda"
          ? a.demanda
          : orderBy === "cliente"
            ? a.cliente
            : a.termino;
      const bValue =
        orderBy === "demanda"
          ? b.demanda
          : orderBy === "cliente"
            ? b.cliente
            : b.termino;

      const compare = aValue.localeCompare(bValue, "pt-BR", {
        sensitivity: "base",
      });

      return sortAsc ? compare : -compare;
    });

    return items;
  }, [filteredDemandas, orderBy, sortAsc]);

  return (
    <>
      <AppHeader title="Demandas" />
      <main className="flex-1 space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Demandas</h2>
            <p className="text-sm text-muted-foreground">
              Gerencie todas as demandas do sistema
            </p>
          </div>
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Cadastrar Demanda
          </Button>
        </div>

        <Card>
          <CardContent className="grid grid-cols-1 gap-4 p-4 md:grid-cols-[1fr_1fr_auto]">
            <div className="flex flex-col gap-2">
              <Label htmlFor="select-searchType">Busca por</Label>
              <Select
                value={searchType}
                onValueChange={(value) => setSearchType(value as SearchType)}
              >
                <SelectTrigger id="select-searchType">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {searchTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="input-searchContent">Conteúdo</Label>
              <Input
                id="input-searchContent"
                name="searchContent"
                placeholder="Digite o termo de busca..."
                maxLength={200}
                value={searchContentInput}
                onChange={(e) => setSearchContentInput(e.target.value)}
              />
            </div>
            <div className="flex items-end gap-2">
              <Button type="button" aria-label="Aplicar filtros" onClick={handleBuscar}>
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Button>
              <Button
                type="button"
                variant="outline"
                aria-label="Limpar filtros"
                onClick={handleLimpar}
              >
                <X className="mr-2 h-4 w-4" />
                Limpar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Lista de Demandas</CardTitle>
            <div className="flex items-center gap-2">
              <Select
                value={orderBy}
                onValueChange={(value) => setOrderBy(value as OrderBy)}
              >
                <SelectTrigger id="select-orderBy" className="w-[200px]">
                  <SelectValue placeholder="Sem ordenação" />
                </SelectTrigger>
                <SelectContent>
                  {orderByOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                aria-label={`Alternar direção da ordenação. Atual: ${sortAsc ? "crescente" : "decrescente"}`}
                title={sortAsc ? "Ordenação crescente" : "Ordenação decrescente"}
                className="h-9"
                onClick={() => setSortAsc((prev) => !prev)}
              >
                <ArrowUp className={`mr-2 h-4 w-4 transition-transform ${sortAsc ? "rotate-0" : "rotate-180"}`} />
                <span className="text-sm">{sortAsc ? "A-Z" : "Z-A"}</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Demanda</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Centro de Custo</TableHead>
                  <TableHead>Preposto</TableHead>
                  <TableHead>Gerente</TableHead>
                  <TableHead>Término</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedDemandas.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-12 text-center text-sm text-muted-foreground"
                    >
                      Nenhuma Demanda encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  displayedDemandas.map((demanda) => (
                    <TableRow key={demanda.id}>
                      <TableCell>{demanda.demanda}</TableCell>
                      <TableCell>{demanda.cliente}</TableCell>
                      <TableCell>{demanda.centroCusto}</TableCell>
                      <TableCell>{demanda.preposto}</TableCell>
                      <TableCell>{demanda.gerente}</TableCell>
                      <TableCell>{demanda.termino}</TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground">
                        -
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <DemandaDrawer
        open={open}
        onOpenChange={setOpen}
        onCreateDemanda={handleCreateDemanda}
      />
    </>
  );
}