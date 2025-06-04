"use client"

import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { DashboardLayout } from '@/components/dashboard/layout'
import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardNav } from '@/components/dashboard/nav'
import { ContentCreationForm } from '@/components/dashboard/content-creation-form'
import { GeneratedContent } from '@/components/dashboard/generated-content'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { ContentType, GeneratedItem } from '@/lib/types'
import { auth } from '@/lib/firebase'
import { trackActivity } from '@/lib/activity'

export default function DashboardPage() {
  const [generatedContent, setGeneratedContent] = useState<GeneratedItem[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [user] = useAuthState(auth)

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
          logoUrl
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate content')
      }

      const data = await response.json()
      setGeneratedContent(data.items)

      // Track activity if user is authenticated
      if (user) {
        await trackActivity(
          user.uid,
          contentType,
          `Generated ${contentType} content for ${tokenName} ($${tokenSymbol})`
        )
      }
    } catch (error) {
      console.error('Error generating content:', error)
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-8">
                <ContentCreationForm 
                  onGenerateContent={handleGenerateContent}
                  isGenerating={isGenerating}
                />
                <GeneratedContent 
                  items={generatedContent}
                  isLoading={isGenerating}
                />
              </div>
            </div>
            <div>
              <RecentActivity />
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  )
}