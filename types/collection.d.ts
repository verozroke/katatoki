import type { Hashtag } from '~/types/feedback'
import type { Post } from '~/types/post'

export type Collection = {
  id: string
  name: string
  description: string
  authorId: string
  posts: Post[]
  hashtags: Hashtag[]
}