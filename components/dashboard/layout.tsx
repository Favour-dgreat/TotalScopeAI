"use client"

import { ReactNode } from 'react'
import { useToast } from '@/hooks/use-toast'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {children}
    </div>
  )
}