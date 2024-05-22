import type { Image } from '~/types/image'
import type { Like } from '~/types/feedback'

export type Post = {
  id: string
  name: string
  caption: string
  image: Image
  likes: Like[]
  collectionId: string
}