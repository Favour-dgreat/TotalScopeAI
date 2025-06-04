export type ContentType = 'tweet' | 'narrative' | 'announcement' | 'hashtag'

export interface GeneratedItem {
  id: string
  type: ContentType
  content: string
  imageUrl?: string
}

export interface TokenInfo {
  name: string
  contentIdea: string
  niche: string
  logoUrl?: string
}

export interface User {
  id: string
  email?: string
  walletAddress?: string
  name?: string
  avatar?: string
  savedContent: GeneratedItem[]
}

export interface ActivityItem {
  id: string
  type: ContentType
  timestamp: Date
  description: string
  userId: string
}