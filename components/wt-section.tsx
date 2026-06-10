import * as React from "react";
import { wtSection } from "@/lib/wt-test-attrs";
import { cn } from "@/lib/utils";

const variantStyles = {
  high: {
    section: "border-amber-500 bg-amber-50/60",
    title: "text-amber-950",
  },
  medium: {
    section: "border-violet-500 bg-violet-50/50",
    title: "text-violet-950",
  },
  low: {
    section: "border-sky-500 bg-sky-50/50",
    title: "text-sky-950",
  },
} as const;

export function WtSection({
  id,
  title,
  children,
  variant = "high",
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  variant?: keyof typeof variantStyles;
}) {
  const styles = variantStyles[variant];

  return (
    <section
      {...wtSection(id, title)}
      className={cn(
        "rounded border-2 border-dashed p-4",
        styles.section
      )}
    >
      <h3
        className={cn(
          "mb-3 font-mono text-sm font-bold uppercase tracking-wide",
          styles.title
        )}
      >
        [WT] {title}
      </h3>
      {children}
    </section>
  );
}
