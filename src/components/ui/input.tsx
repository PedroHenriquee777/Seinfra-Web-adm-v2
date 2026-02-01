import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30  bg-transparent shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: cn(
          "rounded-md border text-base border-input",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        ),
        seinfra: cn(
          "text-seinfra-blue-light-700 font-semibold",
          "border-2 border-seinfra-blue-light-200 rounded-3xl",
          "focus-visible:border-seinfra-blue-light-100",
        ),
      },
      uiSize: {
        default: "w-full min-w-0 h-9 px-3 py-1",
        seinfra: "px-4 py-3 w-component-w max-w-component-max-w",
      },
    },
    defaultVariants: {
      variant: "seinfra",
      uiSize: "seinfra",
    },
  },
);

function Input({
  className,
  variant,
  uiSize,
  type,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, uiSize, className }))}
      {...props}
    />
  );
}

export { Input };
