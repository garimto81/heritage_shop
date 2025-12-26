import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "rounded-md bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "rounded-md hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // New luxury variant - black bg, uppercase, shine effect
        luxury:
          "relative overflow-hidden rounded-none bg-[var(--color-luxury-black)] text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] [&::before]:absolute [&::before]:inset-0 [&::before]:bg-gradient-to-r [&::before]:from-transparent [&::before]:via-white/10 [&::before]:to-transparent [&::before]:translate-x-[-100%] [&::before]:transition-transform [&::before]:duration-1000 hover:[&::before]:translate-x-[100%]",
        // Gold outline variant
        luxuryOutline:
          "relative overflow-hidden rounded-none border border-[var(--color-gold)] bg-transparent text-[var(--color-gold)] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[var(--color-gold)] hover:text-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        // Luxury size - taller, wider padding
        luxury: "h-12 px-10 py-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
