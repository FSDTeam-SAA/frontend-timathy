import type { ReactNode } from "react"

interface AuthFormContainerProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export function AuthFormContainer({ title, subtitle, children }: AuthFormContainerProps) {
  return (
    <div className="bg-[#4B4B4B] max-w-[634px] border border-border rounded-lg p-6 md:p-8 backdrop-blur-sm">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground mb-6">{subtitle}</p>}
      {children}
    </div>
  )
}
