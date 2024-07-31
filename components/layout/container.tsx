import { cn } from '@/lib/utils'
import React from 'react'
export default function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto max-w-7xl px-4 md:px-2', className)}>
      {children}
    </div>
  )
}
