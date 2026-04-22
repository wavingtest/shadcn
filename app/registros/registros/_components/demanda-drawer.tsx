"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import type { NewDemandaInput } from "../page";
import { Button } from "@/components/ui/button";
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
          <SheetTitle>Novo Registro</SheetTitle>
          <SheetDescription>
            Preencha os dados para criar um novo registro de teste
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
                Categoria
                <Required />
              </Label>
              <Select
                value={formState.contrato}
                onValueChange={(value) =>
                  setFormState((prev) => ({ ...prev, contrato: value }))
                }
              >
                <SelectTrigger id="select-contrato" aria-required>
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
            <Label htmlFor="input-descricao">
              Título do Registro
              <Required />
            </Label>
            <Input
              id="input-descricao"
              name="descricao"
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
              <Label htmlFor="input-sigla">
                Código do Registro
                <Required />
              </Label>
              <Input
                id="input-sigla"
                name="sigla"
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
              <Label htmlFor="input-preposto">
                Contato
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
                Responsável
                <Required />
              </Label>
              <Select
                value={formState.gerente}
                onValueChange={(value) =>
                  setFormState((prev) => ({ ...prev, gerente: value }))
                }
              >
                <SelectTrigger id="select-gerente" aria-required>
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
            <Label htmlFor="select-tipoServico">
              Tipo de Registro
              <Required />
            </Label>
            <Select
              value={formState.tipoServico}
              onValueChange={(value) =>
                setFormState((prev) => ({ ...prev, tipoServico: value }))
              }
            >
              <SelectTrigger id="select-tipoServico" aria-required>
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

          <SheetFooter className="px-0 pb-0">
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </SheetClose>
            <Button type="submit" disabled={!isValid} aria-disabled={!isValid}>
              Salvar Registro
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
