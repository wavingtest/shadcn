"use client";

import * as React from "react";
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
import { wtControl, wtName, wtZone } from "@/lib/wt-test-attrs";

const clientes = [
  { value: "Cliente A", label: "Cliente A" },
  { value: "Cliente B", label: "Cliente B" },
  { value: "Cliente C", label: "Cliente C" },
  { value: "Cliente D", label: "Cliente D" },
  { value: "Cliente E", label: "Cliente E" },
];

const contratos = [
  { value: "Categoria A", label: "Categoria A" },
  { value: "Categoria B", label: "Categoria B" },
  { value: "Categoria C", label: "Categoria C" },
];

const gerentes = [
  { value: "Responsável A", label: "Responsável A" },
  { value: "Responsável B", label: "Responsável B" },
  { value: "Responsável C", label: "Responsável C" },
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
  { value: "Operação", label: "Operação" },
  { value: "Análise", label: "Análise" },
  { value: "Acompanhamento", label: "Acompanhamento" },
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

export function RegistroDrawer({
  open,
  onOpenChange,
  onCreateDemanda,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onCreateDemanda: (payload: NewDemandaInput) => void;
}) {
  const [formState, setFormState] = React.useState<FormState>(initialFormState);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setFormState(initialFormState);
    }
    onOpenChange(nextOpen);
  };

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

    handleOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        {...wtZone("wt-drawer-registro", "Drawer — Novo Registro")}
        className="w-full sm:max-w-xl"
      >
        <SheetHeader>
          <SheetTitle {...wtName("Novo Registro")}>Novo Registro</SheetTitle>
          <SheetDescription>
            Preencha os dados para criar um novo registro de teste
          </SheetDescription>
        </SheetHeader>

        <form
          {...wtControl("wt-drawer-form", "Formulário de novo registro", {
            nameAttr: "registro_novo",
          })}
          className="flex-1 space-y-5 overflow-y-auto px-6 py-5"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="wt-drawer-cliente" {...wtName("Cliente")}>
                Cliente
                <Required />
              </Label>
              <Select
                value={formState.cliente}
                onValueChange={(value) =>
                  setFormState((prev) => ({ ...prev, cliente: value }))
                }
              >
                <SelectTrigger
                  {...wtControl("wt-drawer-cliente", "Cliente", {
                    nameAttr: "cliente",
                  })}
                  aria-required
                >
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
              <Label htmlFor="wt-drawer-categoria" {...wtName("Categoria")}>
                Categoria
                <Required />
              </Label>
              <Select
                value={formState.contrato}
                onValueChange={(value) =>
                  setFormState((prev) => ({ ...prev, contrato: value }))
                }
              >
                <SelectTrigger
                  {...wtControl("wt-drawer-categoria", "Categoria", {
                    nameAttr: "contrato",
                  })}
                  aria-required
                >
                  <SelectValue placeholder="Selecione uma categoria" />
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
            <Label htmlFor="wt-drawer-titulo" {...wtName("Título do Registro")}>
              Título do Registro
              <Required />
            </Label>
            <Input
              {...wtControl("wt-drawer-titulo", "Título do Registro", {
                nameAttr: "descricao",
              })}
              maxLength={225}
              placeholder="Ex: Registro de Teste 01"
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
              <Label htmlFor="wt-drawer-codigo" {...wtName("Código do Registro")}>
                Código do Registro
                <Required />
              </Label>
              <Input
                {...wtControl("wt-drawer-codigo", "Código do Registro", {
                  nameAttr: "sigla",
                })}
                maxLength={25}
                placeholder="Ex: REG01"
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
              <Label htmlFor="wt-drawer-contato" {...wtName("Contato")}>
                Contato
                <Required />
              </Label>
              <Input
                {...wtControl("wt-drawer-contato", "Contato", {
                  nameAttr: "preposto",
                })}
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
              <Label htmlFor="wt-drawer-responsavel" {...wtName("Responsável")}>
                Responsável
                <Required />
              </Label>
              <Select
                value={formState.gerente}
                onValueChange={(value) =>
                  setFormState((prev) => ({ ...prev, gerente: value }))
                }
              >
                <SelectTrigger
                  {...wtControl("wt-drawer-responsavel", "Responsável", {
                    nameAttr: "gerente",
                  })}
                  aria-required
                >
                  <SelectValue placeholder="Selecione um responsável" />
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

          <div className="flex flex-col gap-2">
            <Label htmlFor="wt-drawer-tipo-registro" {...wtName("Tipo de Registro")}>
              Tipo de Registro
              <Required />
            </Label>
            <Select
              value={formState.tipoServico}
              onValueChange={(value) =>
                setFormState((prev) => ({ ...prev, tipoServico: value }))
              }
            >
              <SelectTrigger
                {...wtControl("wt-drawer-tipo-registro", "Tipo de Registro", {
                  nameAttr: "tipoServico",
                })}
                aria-required
              >
                <SelectValue placeholder="Selecione um tipo" />
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

          <div className="flex flex-col gap-2">
            <Label htmlFor="wt-drawer-metodologia" {...wtName("Metodologia")}>
              Metodologia
              <Required />
            </Label>
            <Select
              value={formState.metodologia}
              onValueChange={(value) =>
                setFormState((prev) => ({ ...prev, metodologia: value }))
              }
            >
              <SelectTrigger
                {...wtControl("wt-drawer-metodologia", "Metodologia", {
                  nameAttr: "metodologia",
                })}
                aria-required
              >
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

          <div className="flex items-start gap-3 rounded-md border border-input bg-muted/40 px-4 py-3">
            <Checkbox
              {...wtControl("wt-drawer-compartilha", "Compartilha recursos", {
                nameAttr: "compartilhaProfissionais",
              })}
              checked={formState.compartilhaProfissionais}
              onCheckedChange={(value) =>
                setFormState((prev) => ({
                  ...prev,
                  compartilhaProfissionais: value === true,
                }))
              }
            />
            <div className="grid gap-1">
              <Label
                htmlFor="wt-drawer-compartilha"
                className="cursor-pointer text-sm font-medium leading-none"
                {...wtName("Compartilha recursos")}
              >
                Compartilha recursos
              </Label>
              <p className="text-xs text-muted-foreground">
                Indicação simulada para o ambiente de teste (opcional).
              </p>
            </div>
          </div>

          <SheetFooter className="px-0 pb-0">
            <SheetClose asChild>
              <Button
                type="button"
                variant="outline"
                {...wtControl("wt-drawer-cancelar", "Cancelar")}
              >
                Cancelar
              </Button>
            </SheetClose>
            <Button
              type="submit"
              disabled={!isValid}
              aria-disabled={!isValid}
              {...wtControl("wt-drawer-salvar", "Salvar Registro")}
            >
              Salvar Registro
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
