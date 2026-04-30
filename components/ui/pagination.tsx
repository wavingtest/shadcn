import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

export type PaginationLinkProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size"
> & {
  isActive?: boolean;
  size?: ButtonProps["size"];
};

const PaginationLink = React.forwardRef<HTMLButtonElement, PaginationLinkProps>(
  ({ className, isActive, size = "icon", ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  )
);
PaginationLink.displayName = "PaginationLink";

type PaginationNavButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size"
> & {
  size?: ButtonProps["size"];
};

const PaginationPrevious = React.forwardRef<
  HTMLButtonElement,
  PaginationNavButtonProps
>(
  ({ className, size = "default", children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label="Ir para página anterior"
      className={cn(
        buttonVariants({ variant: "outline", size }),
        "gap-1 pl-2.5",
        className
      )}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>{children ?? "Anterior"}</span>
    </button>
  )
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = React.forwardRef<
  HTMLButtonElement,
  PaginationNavButtonProps
>(({ className, size = "default", children, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    aria-label="Ir para próxima página"
    className={cn(
      buttonVariants({ variant: "outline", size }),
      "gap-1 pr-2.5",
      className
    )}
    {...props}
  >
    <span>{children ?? "Próxima"}</span>
    <ChevronRight className="h-4 w-4" />
  </button>
));
PaginationNext.displayName = "PaginationNext";

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">Mais páginas</span>
    </span>
  );
}
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
