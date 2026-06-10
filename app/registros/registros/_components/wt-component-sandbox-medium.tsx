"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

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
      id={`wt-${id}-section`}
      data-wt-component={id}
      className="rounded border-2 border-dashed border-violet-500 bg-violet-50/50 p-4"
    >
      <h3 className="mb-3 font-mono text-sm font-bold uppercase tracking-wide text-violet-950">
        [WT] {title}
      </h3>
      {children}
    </section>
  );
}

export function WtComponentSandboxMedium() {
  const [switchOn, setSwitchOn] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState("opcao-a");
  const [collapsibleOpen, setCollapsibleOpen] = React.useState(false);

  return (
    <div
      id="wt-sandbox-medium"
      data-wt-zone="component-sandbox-medium"
      className="space-y-4 rounded-lg border-4 border-violet-600 bg-white p-4"
    >
      <WtSection id="switch" title="Switch">
        <div className="flex items-center gap-3">
          <Switch
            id="wt-switch-control"
            checked={switchOn}
            onCheckedChange={setSwitchOn}
          />
          <Label htmlFor="wt-switch-control">
            Compartilha recursos: {switchOn ? "ligado" : "desligado"}
          </Label>
        </div>
      </WtSection>

      <WtSection id="radio-group" title="Radio Group">
        <RadioGroup
          id="wt-radio-group"
          value={radioValue}
          onValueChange={setRadioValue}
          className="gap-3"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="opcao-a" id="wt-radio-a" />
            <Label htmlFor="wt-radio-a">Opção A</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="opcao-b" id="wt-radio-b" />
            <Label htmlFor="wt-radio-b">Opção B</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="opcao-c" id="wt-radio-c" />
            <Label htmlFor="wt-radio-c">Opção C</Label>
          </div>
        </RadioGroup>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          Selecionado: {radioValue}
        </p>
      </WtSection>

      <WtSection id="scroll-area" title="Scroll Area">
        <ScrollArea id="wt-scroll-area" className="h-32 w-full max-w-md rounded-md border">
          <div className="space-y-2 p-4 text-sm">
            {Array.from({ length: 12 }, (_, i) => (
              <p key={i}>Linha {i + 1} — conteúdo rolável do Scroll Area.</p>
            ))}
          </div>
        </ScrollArea>
      </WtSection>

      <WtSection id="collapsible" title="Collapsible">
        <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
          <CollapsibleTrigger asChild>
            <Button
              id="wt-collapsible-trigger"
              type="button"
              variant="outline"
              className="gap-2"
            >
              Filtros avançados (Collapsible)
              <ChevronDown
                className={`h-4 w-4 transition-transform ${collapsibleOpen ? "rotate-180" : ""}`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent
            id="wt-collapsible-content"
            className="mt-3 rounded-md border bg-muted/30 p-3 text-sm"
          >
            Conteúdo recolhível: período, status e tags de teste.
          </CollapsibleContent>
        </Collapsible>
      </WtSection>

      <WtSection id="accordion" title="Accordion">
        <Accordion type="single" collapsible id="wt-accordion" className="max-w-md">
          <AccordionItem value="item-1">
            <AccordionTrigger id="wt-accordion-trigger-1">
              Pergunta 1 (Accordion)
            </AccordionTrigger>
            <AccordionContent id="wt-accordion-content-1">
              Resposta da primeira seção do accordion.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger id="wt-accordion-trigger-2">
              Pergunta 2 (Accordion)
            </AccordionTrigger>
            <AccordionContent id="wt-accordion-content-2">
              Resposta da segunda seção do accordion.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </WtSection>

      <WtSection id="avatar" title="Avatar">
        <div className="flex items-center gap-4">
          <Avatar id="wt-avatar">
            <AvatarImage src="" alt="WT Test User" />
            <AvatarFallback id="wt-avatar-fallback">WT</AvatarFallback>
          </Avatar>
          <p className="text-sm text-muted-foreground">
            Avatar com fallback &quot;WT&quot; quando não há imagem.
          </p>
        </div>
      </WtSection>

      <WtSection id="breadcrumb" title="Breadcrumb">
        <Breadcrumb id="wt-breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" id="wt-breadcrumb-inicio">
                  Início
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage id="wt-breadcrumb-registros">Registros</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </WtSection>

      <WtSection id="hover-card" title="Hover Card">
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <Button
              id="wt-hover-card-trigger"
              type="button"
              variant="link"
              className="h-auto p-0"
            >
              Passe o mouse aqui (Hover Card)
            </Button>
          </HoverCardTrigger>
          <HoverCardContent id="wt-hover-card-content" className="w-80">
            <p className="text-sm font-medium">Registro Alfa</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Preview rápido: Cliente A · Situação Ativo · Responsável A.
            </p>
          </HoverCardContent>
        </HoverCard>
      </WtSection>
    </div>
  );
}
