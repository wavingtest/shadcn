"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

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

function WtSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={`wt-${id}`}
      data-wt-component={id}
      className="rounded border-2 border-dashed border-amber-500 bg-amber-50/60 p-4"
    >
      <h3 className="mb-3 font-mono text-sm font-bold uppercase tracking-wide text-amber-950">
        [WT] {title}
      </h3>
      {children}
    </section>
  );
}

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
      id="wt-sandbox"
      data-wt-zone="component-sandbox"
      className="space-y-4 rounded-lg border-4 border-amber-600 bg-white p-4"
    >
      <WtSection id="alert" title="Alert">
        <Alert id="wt-alert-default">
          <Info className="h-4 w-4" />
          <AlertTitle>Alert (default)</AlertTitle>
          <AlertDescription>
            Mensagem inline de exemplo para validação do componente Alert.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive" id="wt-alert-destructive" className="mt-3">
          <AlertTitle>Alert (destructive)</AlertTitle>
          <AlertDescription>
            Variante destrutiva para cenários de erro.
          </AlertDescription>
        </Alert>
      </WtSection>

      <WtSection id="dialog" title="Dialog">
        <Dialog>
          <DialogTrigger asChild>
            <Button id="wt-dialog-trigger" type="button" variant="outline">
              Abrir Dialog
            </Button>
          </DialogTrigger>
          <DialogContent id="wt-dialog-content">
            <DialogHeader>
              <DialogTitle>Dialog — título de teste</DialogTitle>
              <DialogDescription>
                Conteúdo do modal Dialog para o WavingTest.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="button" variant="outline">
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </WtSection>

      <WtSection id="alert-dialog" title="Alert Dialog">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button id="wt-alert-dialog-trigger" type="button" variant="destructive">
              Abrir Alert Dialog
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent id="wt-alert-dialog-content">
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar ação?</AlertDialogTitle>
              <AlertDialogDescription>
                Alert Dialog para confirmações destrutivas (sandbox).
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Confirmar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </WtSection>

      <WtSection id="sonner" title="Sonner (Toast)">
        <div className="flex flex-wrap gap-2">
          <Button
            id="wt-sonner-success"
            type="button"
            onClick={() => toast.success("Toast success (Sonner)")}
          >
            Toast success
          </Button>
          <Button
            id="wt-sonner-error"
            type="button"
            variant="destructive"
            onClick={() => toast.error("Toast error (Sonner)")}
          >
            Toast error
          </Button>
          <Button
            id="wt-sonner-info"
            type="button"
            variant="secondary"
            onClick={() => toast.info("Toast info (Sonner)")}
          >
            Toast info
          </Button>
        </div>
      </WtSection>

      <WtSection id="tabs" title="Tabs">
        <Tabs defaultValue="tab-a" id="wt-tabs">
          <TabsList>
            <TabsTrigger value="tab-a" id="wt-tabs-trigger-a">
              Aba A
            </TabsTrigger>
            <TabsTrigger value="tab-b" id="wt-tabs-trigger-b">
              Aba B
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab-a" id="wt-tabs-content-a" className="mt-2 rounded border p-3 text-sm">
            Conteúdo da Aba A (Tabs).
          </TabsContent>
          <TabsContent value="tab-b" id="wt-tabs-content-b" className="mt-2 rounded border p-3 text-sm">
            Conteúdo da Aba B (Tabs).
          </TabsContent>
        </Tabs>
      </WtSection>

      <WtSection id="skeleton" title="Skeleton">
        <Button
          id="wt-skeleton-toggle"
          type="button"
          variant="outline"
          className="mb-3"
          onClick={() => setShowSkeleton((v) => !v)}
        >
          {showSkeleton ? "Ocultar Skeleton" : "Mostrar Skeleton"}
        </Button>
        {showSkeleton ? (
          <div id="wt-skeleton-demo" className="space-y-3">
            <p className="text-sm font-medium text-foreground">
              Carregando registro de teste…
            </p>
            <div className="space-y-2 rounded-md border bg-muted/30 p-3">
              <Skeleton className="h-4 w-[280px]" />
              <Skeleton className="h-4 w-[220px]" />
              <Skeleton className="h-4 w-[180px]" />
              <Skeleton className="h-4 w-[120px]" />
            </div>
            <p className="text-xs text-muted-foreground">
              Conteúdo que será exibido: {skeletonPreviewContent.titulo} ·{" "}
              {skeletonPreviewContent.cliente} · {skeletonPreviewContent.situacao}
            </p>
          </div>
        ) : (
          <div className="space-y-1 rounded-md border bg-white p-3 text-sm">
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

      <WtSection id="context-menu" title="Context Menu">
        <ContextMenu>
          <ContextMenuTrigger
            id="wt-context-menu-trigger"
            className="flex h-24 w-full max-w-md items-center justify-center rounded-md border bg-muted/40 text-sm text-muted-foreground"
          >
            Clique com o botão direito aqui
          </ContextMenuTrigger>
          <ContextMenuContent id="wt-context-menu-content">
            <ContextMenuItem>Visualizar (sandbox)</ContextMenuItem>
            <ContextMenuItem>Editar (sandbox)</ContextMenuItem>
            <ContextMenuItem className="text-destructive focus:text-destructive">
              Excluir (sandbox)
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </WtSection>

      <WtSection id="combobox" title="Combobox">
        <div className="max-w-sm">
          <Combobox
            id="wt-combobox"
            options={comboboxOptions}
            value={comboboxValue}
            onValueChange={setComboboxValue}
            placeholder="Selecione um cliente (Combobox)"
          />
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            Valor: {comboboxValue || "(vazio)"}
          </p>
        </div>
      </WtSection>

      <WtSection id="form-textarea" title="Form + Textarea">
        <Form {...form}>
          <form
            id="wt-form"
            onSubmit={form.handleSubmit(onSubmitForm)}
            className="max-w-md space-y-4"
          >
            <FormField
              control={form.control}
              name="cliente"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente (via FormField)</FormLabel>
                  <FormControl>
                    <Combobox
                      id="wt-form-combobox"
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
                  <FormLabel>Observação (Textarea)</FormLabel>
                  <FormControl>
                    <Textarea
                      id="wt-form-textarea"
                      placeholder="Digite uma observação de teste..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button id="wt-form-submit" type="submit">
              Enviar Form (sandbox)
            </Button>
            {formSuccess ? (
              <p
                id="wt-form-success"
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
