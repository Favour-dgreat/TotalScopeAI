"use client"

import { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard/layout'
import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardNav } from '@/components/dashboard/nav'
import { ContentCreationForm } from '@/components/dashboard/content-creation-form'
import { GeneratedContent } from '@/components/dashboard/generated-content'
import { ContentType, GeneratedItem } from '@/lib/types'
import { useToast } from '@/hooks/use-toast'

export default function DashboardPage() {
  const [generatedContent, setGeneratedContent] = useState<GeneratedItem[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleGenerateContent = async (
    contentType: ContentType,
    tokenName: string,
    tokenSymbol: string,
    niche: string,
    logoUrl?: string
  ) => {
    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentType,
          tokenName,
          tokenSymbol,
          niche,
          logoUrl,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate content')
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      setGeneratedContent(data.items)
      toast({
        title: "Content generated successfully",
        description: "Your AI-generated content is ready!",
      })
    } catch (error) {
      console.error('Error generating content:', error)
      toast({
        title: "Error generating content",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }
  
  return (
    <DashboardLayout>
      <DashboardHeader />
      <div className="flex min-h-screen">
        <DashboardNav />
        <main className="flex-1 p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ContentCreationForm 
              onGenerateContent={handleGenerateContent}
              isGenerating={isGenerating}
            />
            <GeneratedContent 
              items={generatedContent}
              isLoading={isGenerating}
            />
          </div>
        </main>
      </div>
    </DashboardLayout>
  )
}