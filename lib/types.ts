export type ContentType = 'tweet' | 'announcement' | 'narrative' | 'hashtag'

export interface GeneratedItem {
  id: string
  type: ContentType
  content: string
  imageUrl?: string
}

export interface TokenInfo {
  name: string
  symbol: string
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