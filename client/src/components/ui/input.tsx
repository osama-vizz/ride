import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-base font-medium ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-semibold file:text-foreground placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 hover:border-slate-300 hover:shadow-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }