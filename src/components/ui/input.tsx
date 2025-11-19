import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showCounter?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, showCounter = false, maxLength, value, ...props }, ref) => {
    const currentLength = typeof value === 'string' ? value.length : 0;
    const isNearLimit = maxLength && currentLength > maxLength * 0.8;
    const isAtLimit = maxLength && currentLength >= maxLength;

    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            showCounter && maxLength && "pr-20",
            className
          )}
          ref={ref}
          maxLength={maxLength}
          value={value}
          {...props}
        />
        {showCounter && maxLength && (
          <div 
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium transition-colors",
              isAtLimit ? "text-red-400" : isNearLimit ? "text-amber-400" : "text-muted-foreground"
            )}
          >
            {currentLength}/{maxLength}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
