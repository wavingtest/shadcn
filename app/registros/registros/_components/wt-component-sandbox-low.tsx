"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Bold, Italic, Underline } from "lucide-react";
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
      className="rounded border-2 border-dashed border-sky-500 bg-sky-50/50 p-4"
    >
      <h3 className="mb-3 font-mono text-sm font-bold uppercase tracking-wide text-sky-950">
        [WT] {title}
      </h3>
      {children}
    </section>
  );
}

export function WtComponentSandboxLow() {
  const [sliderValue, setSliderValue] = React.useState([50]);
  const [otp, setOtp] = React.useState("");
  const [toggleFormat, setToggleFormat] = React.useState<string>("bold");

  return (
    <div
      id="wt-sandbox-low"
      data-wt-zone="component-sandbox-low"
      className="space-y-4 rounded-lg border-4 border-sky-600 bg-white p-4"
    >
      <WtSection id="slider" title="Slider">
        <div className="max-w-md space-y-3">
          <Slider
            id="wt-slider"
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

      <WtSection id="toggle" title="Toggle">
        <Toggle
          id="wt-toggle"
          aria-label="Toggle negrito"
          pressed={toggleFormat === "bold"}
          onPressedChange={(pressed) =>
            setToggleFormat(pressed ? "bold" : "")
          }
        >
          <Bold className="h-4 w-4" />
        </Toggle>
      </WtSection>

      <WtSection id="toggle-group" title="Toggle Group">
        <ToggleGroup
          id="wt-toggle-group"
          type="single"
          value={toggleFormat}
          onValueChange={(v) => setToggleFormat(v)}
        >
          <ToggleGroupItem value="bold" id="wt-toggle-group-bold" aria-label="Negrito">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            id="wt-toggle-group-italic"
            aria-label="Itálico"
          >
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="underline"
            id="wt-toggle-group-underline"
            aria-label="Sublinhado"
          >
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          Formato: {toggleFormat || "(nenhum)"}
        </p>
      </WtSection>

      <WtSection id="input-otp" title="Input OTP">
        <div className="space-y-2">
          <Label htmlFor="wt-input-otp">Código de 6 dígitos</Label>
          <InputOTP
            id="wt-input-otp"
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

      <WtSection id="aspect-ratio" title="Aspect Ratio">
        <div className="w-full max-w-md">
          <AspectRatio ratio={16 / 9} id="wt-aspect-ratio">
            <div className="flex h-full w-full items-center justify-center rounded-md bg-primary/20 text-sm font-medium">
              Área 16:9 (Aspect Ratio)
            </div>
          </AspectRatio>
        </div>
      </WtSection>

      <WtSection id="carousel" title="Carousel">
        <Carousel id="wt-carousel" className="mx-auto w-full max-w-md">
          <CarouselContent>
            {carouselSlides.map((slide, index) => (
              <CarouselItem key={slide}>
                <div
                  id={`wt-carousel-slide-${index + 1}`}
                  className="flex h-32 items-center justify-center rounded-md border bg-muted/40 text-sm font-medium"
                >
                  {slide}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious id="wt-carousel-prev" />
          <CarouselNext id="wt-carousel-next" />
        </Carousel>
      </WtSection>

      <WtSection id="chart" title="Chart">
        <ChartContainer
          id="wt-chart"
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

      <WtSection id="resizable" title="Resizable">
        <ResizablePanelGroup
          id="wt-resizable"
          direction="horizontal"
          className="min-h-[120px] max-w-lg rounded-lg border"
        >
          <ResizablePanel defaultSize={50} minSize={25}>
            <div
              id="wt-resizable-panel-a"
              className="flex h-full items-center justify-center p-4 text-sm"
            >
              Painel A
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={25}>
            <div
              id="wt-resizable-panel-b"
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
