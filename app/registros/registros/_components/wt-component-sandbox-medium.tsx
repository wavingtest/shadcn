"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { WtSection } from "@/components/wt-section";
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
import { wtControl, wtLabel, wtName, wtZone } from "@/lib/wt-test-attrs";

export function WtComponentSandboxMedium() {
  const [switchOn, setSwitchOn] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState("opcao-a");
  const [collapsibleOpen, setCollapsibleOpen] = React.useState(false);

  return (
    <div
      {...wtZone("wt-sandbox-medium", "Sandbox WT — prioridade média")}
      className="space-y-4 rounded-lg border-4 border-violet-600 bg-white p-4"
    >
      <WtSection id="switch" title="Switch" variant="medium">
        <div className="flex items-center gap-3">
          <Switch
            {...wtControl("wt-switch-control", "Compartilha recursos", {
              aria: true,
            })}
            checked={switchOn}
            onCheckedChange={setSwitchOn}
          />
          <Label htmlFor="wt-switch-control" {...wtName("Compartilha recursos")}>
            Compartilha recursos
            <span className="sr-only">
              {switchOn ? " (ligado)" : " (desligado)"}
            </span>
          </Label>
          <span aria-hidden className="text-sm text-muted-foreground">
            {switchOn ? "ligado" : "desligado"}
          </span>
        </div>
      </WtSection>

      <WtSection id="radio-group" title="Radio Group" variant="medium">
        <RadioGroup
          {...wtControl("wt-radio-group-root", "Radio Group")}
          value={radioValue}
          onValueChange={setRadioValue}
          className="gap-3"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem
              {...wtControl("wt-radio-opcao-a", "Opção A")}
              value="opcao-a"
            />
            <Label htmlFor="wt-radio-opcao-a" {...wtName("Opção A")}>
              Opção A
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem
              {...wtControl("wt-radio-opcao-b", "Opção B")}
              value="opcao-b"
            />
            <Label htmlFor="wt-radio-opcao-b" {...wtName("Opção B")}>
              Opção B
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem
              {...wtControl("wt-radio-opcao-c", "Opção C")}
              value="opcao-c"
            />
            <Label htmlFor="wt-radio-opcao-c" {...wtName("Opção C")}>
              Opção C
            </Label>
          </div>
        </RadioGroup>
        <p className="mt-2 font-mono text-xs text-muted-foreground" {...wtLabel(`Radio selecionado: ${radioValue}`)}>
          Selecionado: {radioValue}
        </p>
      </WtSection>

      <WtSection id="scroll-area" title="Scroll Area" variant="medium">
        <ScrollArea
          {...wtControl("wt-scroll-area-viewport", "Scroll Area")}
          className="h-32 w-full max-w-md rounded-md border"
        >
          <div className="space-y-2 p-4 text-sm">
            {Array.from({ length: 12 }, (_, i) => (
              <p key={i} {...wtLabel(`Linha ${i + 1} do Scroll Area`)}>
                Linha {i + 1} — conteúdo rolável do Scroll Area.
              </p>
            ))}
          </div>
        </ScrollArea>
      </WtSection>

      <WtSection id="collapsible" title="Collapsible" variant="medium">
        <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
          <CollapsibleTrigger asChild>
            <Button
              {...wtControl("wt-collapsible-trigger", "Filtros avançados (Collapsible)")}
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
            {...wtControl("wt-collapsible-content", "Filtros avançados — conteúdo")}
            className="mt-3 rounded-md border bg-muted/30 p-3 text-sm"
          >
            Conteúdo recolhível: período, status e tags de teste.
          </CollapsibleContent>
        </Collapsible>
      </WtSection>

      <WtSection id="accordion" title="Accordion" variant="medium">
        <Accordion
          type="single"
          collapsible
          {...wtControl("wt-accordion-root", "Accordion")}
          className="max-w-md"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger {...wtControl("wt-accordion-trigger-1", "Pergunta 1 (Accordion)")}>
              Pergunta 1 (Accordion)
            </AccordionTrigger>
            <AccordionContent {...wtControl("wt-accordion-content-1", "Resposta 1 (Accordion)")}>
              Resposta da primeira seção do accordion.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger {...wtControl("wt-accordion-trigger-2", "Pergunta 2 (Accordion)")}>
              Pergunta 2 (Accordion)
            </AccordionTrigger>
            <AccordionContent {...wtControl("wt-accordion-content-2", "Resposta 2 (Accordion)")}>
              Resposta da segunda seção do accordion.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </WtSection>

      <WtSection id="avatar" title="Avatar" variant="medium">
        <div className="flex items-center gap-4">
          <Avatar {...wtControl("wt-avatar-root", "Avatar WT Test User")}>
            <AvatarImage src="" alt="WT Test User" />
            <AvatarFallback {...wtControl("wt-avatar-fallback", "Avatar fallback WT")}>
              WT
            </AvatarFallback>
          </Avatar>
          <p className="text-sm text-muted-foreground" {...wtLabel("Avatar com fallback WT quando não há imagem")}>
            Avatar com fallback &quot;WT&quot; quando não há imagem.
          </p>
        </div>
      </WtSection>

      <WtSection id="breadcrumb" title="Breadcrumb" variant="medium">
        <Breadcrumb {...wtControl("wt-breadcrumb-root", "Breadcrumb")}>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link {...wtControl("wt-breadcrumb-inicio", "Início")} href="/">
                  Início
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage {...wtControl("wt-breadcrumb-registros", "Registros")}>
                Registros
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </WtSection>

      <WtSection id="hover-card" title="Hover Card" variant="medium">
        <HoverCard openDelay={200}>
          <HoverCardTrigger asChild>
            <Button
              {...wtControl("wt-hover-card-trigger", "Passe o mouse aqui (Hover Card)")}
              type="button"
              variant="link"
              className="h-auto p-0"
            >
              Passe o mouse aqui (Hover Card)
            </Button>
          </HoverCardTrigger>
          <HoverCardContent
            {...wtControl("wt-hover-card-content", "Hover Card — preview")}
            className="w-80"
          >
            <p className="text-sm font-medium" {...wtLabel("Hover Card — Registro Alfa")}>Registro Alfa</p>
            <p className="mt-1 text-sm text-muted-foreground" {...wtLabel("Hover Card — Preview do registro")}>
              Preview rápido: Cliente A · Situação Ativo · Responsável A.
            </p>
          </HoverCardContent>
        </HoverCard>
      </WtSection>
    </div>
  );
}
