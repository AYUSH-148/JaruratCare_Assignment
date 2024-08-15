"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { value: number }
>(({ className, value, ...props }, ref) => {
  const progressPercentage = value || 0; // Ensures default value of 0 if value is undefined

  // Define pointer color based on the progress value
  const getPointerColor = (percentage: number) => {
    if (percentage < 2) return 'bg-gray-700'
    if (percentage < 45) return 'bg-blue-500';
    if (percentage < 60) return 'bg-blue-700';
    return 'bg-blue-900';
  }

  return (
    <div className="relative">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-5 w-full overflow-hidden rounded-md bg-neutral-300 dark:bg-neutral-800",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="h-full w-full flex-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${100 - progressPercentage}%)` }}
        />
      </ProgressPrimitive.Root>
      <div
        className={`absolute text-xs top-1/2 transform -translate-y-1/2 text-white px-2 py-2 rounded-full ${getPointerColor(progressPercentage)}`}
        style={{ left: `calc(${progressPercentage}% - 20px)` }}
      >
        {Math.round(progressPercentage)}%
      </div>
    </div>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
