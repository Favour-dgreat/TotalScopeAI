"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ContentType, GeneratedItem } from '@/lib/types'
import { 
  Sparkles, 
  Copy, 
  Bookmark, 
  BookmarkCheck,
  Loader2,
  RotateCw,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface GeneratedContentProps {
  items: GeneratedItem[]
  isLoading: boolean
}

export function GeneratedContent({ items, isLoading }: GeneratedContentProps) {
  const { toast } = useToast()
  const [savedItems, setSavedItems] = useState<string[]>([])
  
  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied to clipboard",
      description: "Content has been copied to your clipboard",
    })
  }
  
  const handleSaveContent = (id: string) => {
    if (savedItems.includes(id)) {
      setSavedItems(savedItems.filter(itemId => itemId !== id))
      toast({
        title: "Removed from favorites",
        description: "Content has been removed from your favorites",
      })
    } else {
      setSavedItems([...savedItems, id])
      toast({
        title: "Saved to favorites",
        description: "Content has been saved to your favorites",
      })
    }
  }
  
  const getContentTypeItems = (type: ContentType) => {
    return items.filter(item => item.type === type)
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Generated Content
        </CardTitle>
        <CardDescription>
          Your AI-generated content will appear here
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center max-w-xs">
              Crafting brilliant content with AI magic...
            </p>
          </div>
        ) : items.length > 0 ? (
          <Tabs defaultValue="tweet">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="tweet" disabled={getContentTypeItems('tweet').length === 0}>
                Tweets
              </TabsTrigger>
              <TabsTrigger value="announcement" disabled={getContentTypeItems('announcement').length === 0}>
                Posts
              </TabsTrigger>
              <TabsTrigger value="narrative" disabled={getContentTypeItems('narrative').length === 0}>
                Narratives
              </TabsTrigger>
              <TabsTrigger value="hashtag" disabled={getContentTypeItems('hashtag').length === 0}>
                Hashtags
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tweet" className="space-y-4">
              {getContentTypeItems('tweet').map((item) => (
                <ContentCard 
                  key={item.id}
                  item={item}
                  isSaved={savedItems.includes(item.id)}
                  onCopy={() => handleCopyContent(item.content)}
                  onSave={() => handleSaveContent(item.id)}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="announcement" className="space-y-4">
              {getContentTypeItems('announcement').map((item) => (
                <ContentCard 
                  key={item.id}
                  item={item}
                  isSaved={savedItems.includes(item.id)}
                  onCopy={() => handleCopyContent(item.content)}
                  onSave={() => handleSaveContent(item.id)}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="narrative" className="space-y-4">
              {getContentTypeItems('narrative').map((item) => (
                <ContentCard 
                  key={item.id}
                  item={item}
                  isSaved={savedItems.includes(item.id)}
                  onCopy={() => handleCopyContent(item.content)}
                  onSave={() => handleSaveContent(item.id)}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="hashtag" className="space-y-4">
              {getContentTypeItems('hashtag').map((item) => (
                <ContentCard 
                  key={item.id}
                  item={item}
                  isSaved={savedItems.includes(item.id)}
                  onCopy={() => handleCopyContent(item.content)}
                  onSave={() => handleSaveContent(item.id)}
                />
              ))}
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <RotateCw className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">No content generated yet</h3>
            <p className="text-muted-foreground text-center max-w-xs mb-6">
              Fill out the form and click Generate to create AI-powered content for your project
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface ContentCardProps {
  item: GeneratedItem
  isSaved: boolean
  onCopy: () => void
  onSave: () => void
}

function ContentCard({ item, isSaved, onCopy, onSave }: ContentCardProps) {
  return (
    <div className="border rounded-lg p-4 bg-card/50">
      <p className="whitespace-pre-line mb-4">{item.content}</p>
      
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onCopy}>
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ThumbsUp className="h-4 w-4 text-muted-foreground hover:text-primary" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ThumbsDown className="h-4 w-4 text-muted-foreground hover:text-primary" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onSave}>
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4 text-primary" />
            ) : (
              <Bookmark className="h-4 w-4 text-muted-foreground hover:text-primary" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}