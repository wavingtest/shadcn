"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import type { NewDemandaInput } from "../page";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const clientes = [
  { value: "Cliente A", label: "Cliente A" },
  { value: "Cliente B", label: "Cliente B" },
  { value: "Cliente C", label: "Cliente C" },
  { value: "Cliente D", label: "Cliente D" },
  { value: "Cliente E", label: "Cliente E" },
];

const contratos = [
  { value: "Contrato 001/2025", label: "Contrato 001/2025" },
  { value: "Contrato 002/2025", label: "Contrato 002/2025" },
  { value: "Contrato 003/2025", label: "Contrato 003/2025" },
];

const gerentes = [
  { value: "Gerente A", label: "Gerente A" },
  { value: "Gerente B", label: "Gerente B" },
  { value: "Gerente C", label: "Gerente C" },
];

const metodologias = [
  { value: "Scrum", label: "Scrum" },
  { value: "Kanban", label: "Kanban" },
  { value: "Waterfall", label: "Waterfall" },
  { value: "Lean", label: "Lean" },
  { value: "Safe", label: "Safe" },
  { value: "Híbrido", label: "Híbrido" },
  { value: "XP", label: "XP" },
];

const tiposServico = [
  { value: "Desenvolvimento", label: "Desenvolvimento" },
  { value: "Sustentação", label: "Sustentação" },
  { value: "Consultoria", label: "Consultoria" },
];

type FormState = NewDemandaInput;

const initialFormState: FormState = {
  cliente: "",
  contrato: "",
  descricao: "",
  sigla: "",
  preposto: "",
  gerente: "",
  tipoServico: "",
  compartilhaProfissionais: false,
  metodologia: "",
};

function Required() {
  return <span className="text-destructive"> *</span>;
}

export function DemandaDrawer({
  open,
  onOpenChange,
  onCreateDemanda,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onCreateDemanda: (payload: NewDemandaInput) => void;
}) {
  const [formState, setFormState] = React.useState<FormState>(initialFormState);

  React.useEffect(() => {
    if (open) {
      setFormState(initialFormState);
    }
  }, [open]);

  const isValid =
    formState.cliente.trim().length > 0 &&
    formState.contrato.trim().length > 0 &&
    formState.descricao.trim().length > 0 &&
    formState.sigla.trim().length > 0 &&
    formState.gerente.trim().length > 0 &&
    formState.tipoServico.trim().length > 0 &&
    formState.metodologia.trim().length > 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    onCreateDemanda({
      ...formState,
      descricao: formState.descricao.trim(),
      sigla: formState.sigla.trim(),
      preposto: formState.preposto.trim(),
    });

    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Cadastrar Demanda</SheetTitle>
          <SheetDescription>
            Preencha os dados para cadastrar uma nova demanda
          </SheetDescription>
        </SheetHeader>

        <form
          className="flex-1 space-y-5 overflow-y-auto px-6 py-5"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="select-cliente">
                Cliente
                <Required />
              </Label>
              <Select
                value={formState.cliente}
                onValueChange={(value) =>
                  setFormState((prev) => ({ ...prev, cliente: value }))
                }
              >
                <SelectTrigger id="select-cliente" aria-required>
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientes.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="select-contrato">
                Contrato
                <Required />
              </Label>
              <Select
                value={formState.contrato}
                onValueChange={(value) =>
                  setFormState((prev) => ({ ...prev, contrato: value }))
                }
              >
                <SelectTrigger id="select-contrato" aria-required>
                  <SelectValue placeholder="Selecione um Contrato" />
                </SelectTrigger>
                <SelectContent>
                  {contratos.map((contrato) => (
                    <SelectItem key={contrato.value} value={contrato.value}>
                      {contrato.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="input-descricao">
              Descrição da Demanda
              <Required />
            </Label>
            <Input
              id="input-descricao"
              name="descricao"
              maxLength={225}
              placeholder="Sistema de Vendas Online"
              aria-required
              value={formState.descricao}
              onChange={(event) =>
                setFormState((prev) => ({
                  ...prev,
                  descricao: event.target.value,
                }))
              }
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="input-sigla">
                Sigla da Demanda
                <Required />
              </Label>
              <Input
                id="input-sigla"
                name="sigla"
                maxLength={25}
                placeholder="Ex: SVD"
                aria-required
                value={formState.sigla}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    sigla: event.target.value,
                  }))
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="input-preposto">
                Preposto
                <Required />
              </Label>
              <Input
                id="input-preposto"
                name="preposto"
                maxLength={225}
                placeholder=""
                value={formState.preposto}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    preposto: event.target.value,
                  }))
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="select-gerente">
                Gerente
                <Required />
              </Label>
              <Select
                value={formState.gerente}
                onValueChange={(value) =>
                  setFormState((prev) => ({ ...prev, gerente: value }))
                }
              >
                <SelectTrigger id="select-gerente" aria-required>
                  <SelectValue placeholder="Selecione um Gerente" />
                </SelectTrigger>
                <SelectContent>
                  {gerentes.map((gerente) => (
                    <SelectItem key={gerente.value} value={gerente.value}>
                      {gerente.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="select-tipoServico">
                Tipo de Serviço
                <Required />
              </Label>
              <Select
                value={formState.tipoServico}
                onValueChange={(value) =>
                  setFormState((prev) => ({ ...prev, tipoServico: value }))
                }
              >
                <SelectTrigger id="select-tipoServico" aria-required>
                  <SelectValue placeholder="Selecione um tipo de serviço" />
                </SelectTrigger>
                <SelectContent>
                  {tiposServico.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="checkbox-compartilhaProfissionais"
                  checked={formState.compartilhaProfissionais}
                  onCheckedChange={(value) =>
                    setFormState((prev) => ({
                      ...prev,
                      compartilhaProfissionais: Boolean(value),
                    }))
                  }
                />
                <Label
                  htmlFor="checkbox-compartilhaProfissionais"
                  className="cursor-pointer"
                >
                  Compartilha Profissionais
                </Label>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="select-metodologia">
              Metodologia
              <Required />
            </Label>
            <Select
              value={formState.metodologia}
              onValueChange={(value) =>
                setFormState((prev) => ({ ...prev, metodologia: value }))
              }
            >
              <SelectTrigger id="select-metodologia" aria-required>
                <SelectValue placeholder="Selecione uma metodologia" />
              </SelectTrigger>
              <SelectContent>
                {metodologias.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <section className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Releases</h3>
              <Button type="button" variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Releases
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Nenhuma Release adicionada ainda
            </p>
          </section>

          <section className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Tecnologias</h3>
              <Button type="button" variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Tecnologia
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Nenhuma tecnologia adicionada ainda
            </p>
          </section>

          <SheetFooter className="px-0 pb-0">
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </SheetClose>
            <Button type="submit" disabled={!isValid} aria-disabled={!isValid}>
              Cadastrar Demanda
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}