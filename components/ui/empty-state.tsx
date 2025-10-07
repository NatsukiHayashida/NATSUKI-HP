import * as React from "react"
import Link from "next/link"
import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon: Icon, title, description, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center py-16 px-4 text-center",
          className
        )}
        {...props}
      >
        <div className="rounded-full bg-muted p-6 mb-6">
          <Icon className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground max-w-md mb-6">{description}</p>
        {action && (
          <Button asChild variant="brand">
            <Link href={action.href}>{action.label}</Link>
          </Button>
        )}
      </div>
    )
  }
)
EmptyState.displayName = "EmptyState"

export { EmptyState }
