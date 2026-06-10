"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { WtSection } from "@/components/wt-section";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { wtControl, wtLabel, wtName, wtZone } from "@/lib/wt-test-attrs";

const comboboxOptions = [
  { value: "cliente-a", label: "Cliente A" },
  { value: "cliente-b", label: "Cliente B" },
  { value: "cliente-c", label: "Cliente C" },
];

const formSchema = z.object({
  observacao: z.string().min(3, "Informe pelo menos 3 caracteres."),
  cliente: z.string().min(1, "Selecione um cliente."),
});

type FormValues = z.infer<typeof formSchema>;

const skeletonPreviewContent = {
  titulo: "Registro Alfa — integração QA",
  cliente: "Cliente A",
  responsavel: "Responsável A",
  situacao: "Ativo",
};

export function WtComponentSandbox() {
  const [showSkeleton, setShowSkeleton] = React.useState(false);
  const [comboboxValue, setComboboxValue] = React.useState("");
  const [formSuccess, setFormSuccess] = React.useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      observacao: "",
      cliente: "",
    },
  });

  const onSubmitForm = (values: FormValues) => {
    const clienteLabel =
      comboboxOptions.find((o) => o.value === values.cliente)?.label ??
      values.cliente;

    setFormSuccess(
      `Envio confirmado: ${clienteLabel} — observação salva com sucesso.`
    );
    toast.success("Form enviado (sandbox)", {
      description: `${clienteLabel} — ${values.observacao.slice(0, 40)}`,
    });
  };

  return (
    <div
      {...wtZone("wt-sandbox", "Sandbox WT — prioridade alta")}
      className="space-y-4 rounded-lg border-4 border-amber-600 bg-white p-4"
    >
      <WtSection id="alert" title="Alert" variant="high">
        <Alert {...wtControl("wt-alert-default", "Alert (default)")}>
          <Info className="h-4 w-4" />
          <AlertTitle {...wtLabel("Alert (default)")}>Alert (default)</AlertTitle>
          <AlertDescription {...wtLabel("Mensagem inline de exemplo para validação do componente Alert")}>
            Mensagem inline de exemplo para validação do componente Alert.
          </AlertDescription>
        </Alert>
        <Alert
          variant="destructive"
          {...wtControl("wt-alert-destructive", "Alert (destructive)")}
          className="mt-3"
        >
          <AlertTitle {...wtLabel("Alert (destructive)")}>Alert (destructive)</AlertTitle>
          <AlertDescription {...wtLabel("Variante destrutiva para cenários de erro")}>
            Variante destrutiva para cenários de erro.
          </AlertDescription>
        </Alert>
      </WtSection>

      <WtSection id="dialog" title="Dialog" variant="high">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              {...wtControl("wt-dialog-trigger", "Abrir Dialog")}
              type="button"
              variant="outline"
            >
              Abrir Dialog
            </Button>
          </DialogTrigger>
          <DialogContent {...wtControl("wt-dialog-content", "Dialog — conteúdo")}>
            <DialogHeader>
              <DialogTitle {...wtLabel("Dialog — título de teste")}>Dialog — título de teste</DialogTitle>
              <DialogDescription {...wtLabel("Conteúdo do modal Dialog para o WavingTest")}>
                Conteúdo do modal Dialog para o WavingTest.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                {...wtControl("wt-dialog-fechar", "Fechar Dialog")}
                type="button"
                variant="outline"
              >
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </WtSection>

      <WtSection id="alert-dialog" title="Alert Dialog" variant="high">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              {...wtControl("wt-alert-dialog-trigger", "Abrir Alert Dialog")}
              type="button"
              variant="destructive"
            >
              Abrir Alert Dialog
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent
            {...wtControl("wt-alert-dialog-content", "Alert Dialog — conteúdo")}
          >
            <AlertDialogHeader>
              <AlertDialogTitle {...wtLabel("Confirmar ação?")}>Confirmar ação?</AlertDialogTitle>
              <AlertDialogDescription {...wtLabel("Alert Dialog para confirmações destrutivas (sandbox)")}>
                Alert Dialog para confirmações destrutivas (sandbox).
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel {...wtControl("wt-alert-dialog-cancelar", "Cancelar")}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction {...wtControl("wt-alert-dialog-confirmar", "Confirmar")}>
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </WtSection>

      <WtSection id="sonner" title="Sonner (Toast)" variant="high">
        <div className="flex flex-wrap gap-2">
          <Button
            {...wtControl("wt-sonner-success", "Toast success")}
            type="button"
            onClick={() => toast.success("Toast success (Sonner)")}
          >
            Toast success
          </Button>
          <Button
            {...wtControl("wt-sonner-error", "Toast error")}
            type="button"
            variant="destructive"
            onClick={() => toast.error("Toast error (Sonner)")}
          >
            Toast error
          </Button>
          <Button
            {...wtControl("wt-sonner-info", "Toast info")}
            type="button"
            variant="secondary"
            onClick={() => toast.info("Toast info (Sonner)")}
          >
            Toast info
          </Button>
        </div>
      </WtSection>

      <WtSection id="tabs" title="Tabs" variant="high">
        <Tabs defaultValue="tab-a" {...wtControl("wt-tabs-root", "Tabs")}>
          <TabsList {...wtName("Tabs — lista")}>
            <TabsTrigger
              {...wtControl("wt-tabs-trigger-a", "Aba A")}
              value="tab-a"
            >
              Aba A
            </TabsTrigger>
            <TabsTrigger
              {...wtControl("wt-tabs-trigger-b", "Aba B")}
              value="tab-b"
            >
              Aba B
            </TabsTrigger>
          </TabsList>
          <TabsContent
            {...wtControl("wt-tabs-content-a", "Conteúdo Aba A")}
            value="tab-a"
            className="mt-2 rounded border p-3 text-sm"
          >
            Conteúdo da Aba A (Tabs).
          </TabsContent>
          <TabsContent
            {...wtControl("wt-tabs-content-b", "Conteúdo Aba B")}
            value="tab-b"
            className="mt-2 rounded border p-3 text-sm"
          >
            Conteúdo da Aba B (Tabs).
          </TabsContent>
        </Tabs>
      </WtSection>

      <WtSection id="skeleton" title="Skeleton" variant="high">
        <Button
          {...wtControl(
            "wt-skeleton-toggle",
            showSkeleton ? "Ocultar Skeleton" : "Mostrar Skeleton"
          )}
          type="button"
          variant="outline"
          className="mb-3"
          onClick={() => setShowSkeleton((v) => !v)}
        >
          {showSkeleton ? "Ocultar Skeleton" : "Mostrar Skeleton"}
        </Button>
        {showSkeleton ? (
          <div {...wtControl("wt-skeleton-demo", "Skeleton — carregando")} className="space-y-3">
            <p className="text-sm font-medium text-foreground" {...wtLabel("Carregando registro de teste")}>
              Carregando registro de teste…
            </p>
            <div className="space-y-2 rounded-md border bg-muted/30 p-3">
              <Skeleton className="h-4 w-[280px]" />
              <Skeleton className="h-4 w-[220px]" />
              <Skeleton className="h-4 w-[180px]" />
              <Skeleton className="h-4 w-[120px]" />
            </div>
            <p className="text-xs text-muted-foreground" {...wtLabel("Prévia do conteúdo do Skeleton")}>
              Conteúdo que será exibido: {skeletonPreviewContent.titulo} ·{" "}
              {skeletonPreviewContent.cliente} · {skeletonPreviewContent.situacao}
            </p>
          </div>
        ) : (
          <div
            {...wtControl("wt-skeleton-loaded", "Skeleton — conteúdo carregado")}
            className="space-y-1 rounded-md border bg-white p-3 text-sm"
          >
            <p>
              <span className="font-medium">Registro:</span>{" "}
              {skeletonPreviewContent.titulo}
            </p>
            <p>
              <span className="font-medium">Cliente:</span>{" "}
              {skeletonPreviewContent.cliente}
            </p>
            <p>
              <span className="font-medium">Responsável:</span>{" "}
              {skeletonPreviewContent.responsavel}
            </p>
            <p>
              <span className="font-medium">Situação:</span>{" "}
              {skeletonPreviewContent.situacao}
            </p>
          </div>
        )}
      </WtSection>

      <WtSection id="context-menu" title="Context Menu" variant="high">
        <ContextMenu>
          <ContextMenuTrigger
            {...wtControl("wt-context-menu-trigger", "Context Menu — área")}
            className="flex h-24 w-full max-w-md items-center justify-center rounded-md border bg-muted/40 text-sm text-muted-foreground"
          >
            Clique com o botão direito aqui
          </ContextMenuTrigger>
          <ContextMenuContent {...wtControl("wt-context-menu-content", "Context Menu — menu")}>
            <ContextMenuItem {...wtName("Visualizar (sandbox)")}>
              Visualizar (sandbox)
            </ContextMenuItem>
            <ContextMenuItem {...wtName("Editar (sandbox)")}>
              Editar (sandbox)
            </ContextMenuItem>
            <ContextMenuItem
              {...wtName("Excluir (sandbox)")}
              className="text-destructive focus:text-destructive"
            >
              Excluir (sandbox)
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </WtSection>

      <WtSection id="combobox" title="Combobox" variant="high">
        <div className="max-w-sm">
          <Label htmlFor="wt-combobox-control" {...wtName("Cliente (Combobox)")}>
            Cliente (Combobox)
          </Label>
          <Combobox
            id="wt-combobox-control"
            name="cliente_combobox"
            data-wt-name="Cliente (Combobox)"
            aria-label="Cliente (Combobox)"
            options={comboboxOptions}
            value={comboboxValue}
            onValueChange={setComboboxValue}
            placeholder="Selecione um cliente (Combobox)"
            className="mt-2"
          />
          <p className="mt-2 font-mono text-xs text-muted-foreground" {...wtLabel("Valor selecionado no Combobox")}>
            Valor: {comboboxValue || "(vazio)"}
          </p>
        </div>
      </WtSection>

      <WtSection id="form-textarea" title="Form + Textarea" variant="high">
        <Form {...form}>
          <form
            {...wtControl("wt-form", "Form sandbox", { nameAttr: "wt_form" })}
            onSubmit={form.handleSubmit(onSubmitForm)}
            className="max-w-md space-y-4"
          >
            <FormField
              control={form.control}
              name="cliente"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="wt-form-combobox-control"
                    {...wtName("Cliente (via FormField)")}
                  >
                    Cliente (via FormField)
                  </FormLabel>
                  <FormControl>
                    <Combobox
                      id="wt-form-combobox-control"
                      name="cliente"
                      data-wt-name="Cliente (via FormField)"
                      aria-label="Cliente (via FormField)"
                      options={comboboxOptions}
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="Cliente no formulário"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="observacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="wt-form-textarea-control"
                    {...wtName("Observação (Textarea)")}
                  >
                    Observação (Textarea)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Digite uma observação de teste..."
                      {...field}
                      id="wt-form-textarea-control"
                      {...wtName("Observação (Textarea)")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              {...wtControl("wt-form-submit", "Enviar Form (sandbox)")}
              type="submit"
            >
              Enviar Form (sandbox)
            </Button>
            {formSuccess ? (
              <p
                {...wtControl("wt-form-success", "Envio confirmado")}
                role="status"
                className="rounded-md border border-green-600 bg-green-50 px-3 py-2 text-sm font-medium text-green-800"
              >
                {formSuccess}
              </p>
            ) : null}
          </form>
        </Form>
      </WtSection>
    </div>
  );
}
