"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const luxuryCardVariants = cva(
  "relative bg-[var(--color-surface)] transition-all duration-500",
  {
    variants: {
      variant: {
        // Default: black top line on hover
        default: [
          "shadow-pristine hover:shadow-sharp hover:-translate-y-1",
          "before:absolute before:top-0 before:left-0 before:w-full before:h-0.5",
          "before:bg-[var(--color-luxury-black)]",
          "before:scale-x-0 before:origin-left before:transition-transform before:duration-700",
          "hover:before:scale-x-100",
        ].join(" "),
        // Gold: gold top line on hover
        gold: [
          "shadow-pristine hover:shadow-sharp hover:-translate-y-1",
          "before:absolute before:top-0 before:left-0 before:w-full before:h-0.5",
          "before:bg-[var(--color-gold)]",
          "before:scale-x-0 before:origin-left before:transition-transform before:duration-700",
          "hover:before:scale-x-100",
        ].join(" "),
        // Static: no hover effects, just pristine shadow
        static: "shadow-pristine",
        // Outline: border only, no shadow
        outline: "border border-[var(--color-border)] hover:border-[var(--color-gold)]",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "lg",
    },
  }
);

export interface LuxuryCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof luxuryCardVariants> {
  as?: "div" | "article" | "section";
}

const LuxuryCard = React.forwardRef<HTMLDivElement, LuxuryCardProps>(
  ({ className, variant, padding, as: Component = "div", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(luxuryCardVariants({ variant, padding, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

LuxuryCard.displayName = "LuxuryCard";

// Header component for LuxuryCard
const LuxuryCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-3 mb-4", className)}
    {...props}
  />
));
LuxuryCardHeader.displayName = "LuxuryCardHeader";

// Label component (e.g., "— AUTHENTICATION")
const LuxuryCardLabel = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.35em] text-[var(--color-gold-dark)]",
      className
    )}
    {...props}
  >
    <span className="w-3 h-px bg-[var(--color-gold-dark)]" />
    {children}
  </span>
));
LuxuryCardLabel.displayName = "LuxuryCardLabel";

// Title component
const LuxuryCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "font-[var(--font-playfair)] text-2xl text-[var(--color-luxury-black)]",
      className
    )}
    {...props}
  />
));
LuxuryCardTitle.displayName = "LuxuryCardTitle";

// Description component
const LuxuryCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-[11px] font-light text-[var(--color-text-muted)] leading-relaxed tracking-wide",
      className
    )}
    {...props}
  />
));
LuxuryCardDescription.displayName = "LuxuryCardDescription";

// Content wrapper
const LuxuryCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
LuxuryCardContent.displayName = "LuxuryCardContent";

// Footer component
const LuxuryCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-2 mt-6 pt-4 border-t border-[var(--color-border)]",
      className
    )}
    {...props}
  />
));
LuxuryCardFooter.displayName = "LuxuryCardFooter";

export {
  LuxuryCard,
  LuxuryCardHeader,
  LuxuryCardLabel,
  LuxuryCardTitle,
  LuxuryCardDescription,
  LuxuryCardContent,
  LuxuryCardFooter,
  luxuryCardVariants,
};
