"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Bold, Italic, Underline } from "lucide-react";
import { WtSection } from "@/components/wt-section";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { wtControl, wtName, wtZone } from "@/lib/wt-test-attrs";

const chartData = [
  { mes: "Jan", registros: 4 },
  { mes: "Fev", registros: 7 },
  { mes: "Mar", registros: 5 },
  { mes: "Abr", registros: 9 },
];

const chartConfig = {
  registros: {
    label: "Registros",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const carouselSlides = [
  "Slide 1 — Carousel",
  "Slide 2 — Carousel",
  "Slide 3 — Carousel",
];

export function WtComponentSandboxLow() {
  const [sliderValue, setSliderValue] = React.useState([50]);
  const [otp, setOtp] = React.useState("");
  const [toggleFormat, setToggleFormat] = React.useState<string>("bold");

  return (
    <div
      {...wtZone("wt-sandbox-low", "Sandbox WT — prioridade baixa")}
      className="space-y-4 rounded-lg border-4 border-sky-600 bg-white p-4"
    >
      <WtSection id="slider" title="Slider" variant="low">
        <div className="max-w-md space-y-3">
          <Label htmlFor="wt-slider-control" {...wtName("Slider de valor")}>
            Slider de valor
          </Label>
          <Slider
            {...wtControl("wt-slider-control", "Slider de valor", { aria: true })}
            value={sliderValue}
            onValueChange={setSliderValue}
            max={100}
            step={1}
          />
          <p className="text-sm text-muted-foreground">
            Valor: {sliderValue[0]}%
          </p>
        </div>
      </WtSection>

      <WtSection id="toggle" title="Toggle" variant="low">
        <Toggle
          {...wtControl("wt-toggle-negrito", "Toggle negrito", { aria: true })}
          pressed={toggleFormat === "bold"}
          onPressedChange={(pressed) =>
            setToggleFormat(pressed ? "bold" : "")
          }
        >
          <Bold className="h-4 w-4" />
        </Toggle>
      </WtSection>

      <WtSection id="toggle-group" title="Toggle Group" variant="low">
        <ToggleGroup
          {...wtControl("wt-toggle-group-root", "Toggle Group")}
          type="single"
          value={toggleFormat}
          onValueChange={(v) => setToggleFormat(v)}
        >
          <ToggleGroupItem
            {...wtControl("wt-toggle-group-negrito", "Negrito", { aria: true })}
            value="bold"
          >
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            {...wtControl("wt-toggle-group-italico", "Itálico", { aria: true })}
            value="italic"
          >
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            {...wtControl("wt-toggle-group-sublinhado", "Sublinhado", { aria: true })}
            value="underline"
          >
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          Formato: {toggleFormat || "(nenhum)"}
        </p>
      </WtSection>

      <WtSection id="input-otp" title="Input OTP" variant="low">
        <div className="space-y-2">
          <Label htmlFor="wt-input-otp-control" {...wtName("Código de 6 dígitos")}>
            Código de 6 dígitos
          </Label>
          <InputOTP
            {...wtControl("wt-input-otp-control", "Código de 6 dígitos", {
              nameAttr: "codigo_otp",
            })}
            maxLength={6}
            value={otp}
            onChange={setOtp}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="font-mono text-xs text-muted-foreground">
            Digitado: {otp || "(vazio)"}
          </p>
        </div>
      </WtSection>

      <WtSection id="aspect-ratio" title="Aspect Ratio" variant="low">
        <div className="w-full max-w-md">
          <AspectRatio ratio={16 / 9} {...wtControl("wt-aspect-ratio-box", "Aspect Ratio 16:9")}>
            <div className="flex h-full w-full items-center justify-center rounded-md bg-primary/20 text-sm font-medium">
              Área 16:9 (Aspect Ratio)
            </div>
          </AspectRatio>
        </div>
      </WtSection>

      <WtSection id="carousel" title="Carousel" variant="low">
        <Carousel {...wtControl("wt-carousel-root", "Carousel")} className="mx-auto w-full max-w-md">
          <CarouselContent>
            {carouselSlides.map((slide, index) => (
              <CarouselItem key={slide}>
                <div
                  {...wtControl(`wt-carousel-slide-${index + 1}`, slide)}
                  className="flex h-32 items-center justify-center rounded-md border bg-muted/40 text-sm font-medium"
                >
                  {slide}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious {...wtControl("wt-carousel-anterior", "Carousel — anterior")} />
          <CarouselNext {...wtControl("wt-carousel-proximo", "Carousel — próximo")} />
        </Carousel>
      </WtSection>

      <WtSection id="chart" title="Chart" variant="low">
        <ChartContainer
          {...wtControl("wt-chart-container", "Chart — registros por mês")}
          config={chartConfig}
          className="h-[220px] w-full max-w-md"
        >
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="mes"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="registros"
              fill="var(--color-registros)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </WtSection>

      <WtSection id="resizable" title="Resizable" variant="low">
        <ResizablePanelGroup
          {...wtControl("wt-resizable-root", "Resizable — painéis")}
          direction="horizontal"
          className="min-h-[120px] max-w-lg rounded-lg border"
        >
          <ResizablePanel defaultSize={50} minSize={25}>
            <div
              {...wtControl("wt-resizable-painel-a", "Painel A")}
              className="flex h-full items-center justify-center p-4 text-sm"
            >
              Painel A
            </div>
          </ResizablePanel>
          <ResizableHandle
            {...wtControl("wt-resizable-handle", "Resizable — divisor")}
            withHandle
          />
          <ResizablePanel defaultSize={50} minSize={25}>
            <div
              {...wtControl("wt-resizable-painel-b", "Painel B (arraste o divisor)")}
              className="flex h-full items-center justify-center p-4 text-sm"
            >
              Painel B (arraste o divisor)
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </WtSection>
    </div>
  );
}
