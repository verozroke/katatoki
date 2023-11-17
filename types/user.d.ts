import type { Image } from '~/types/image'
import type { Collection } from '~/types/collection'
import type { Follow } from '~/types/feedback'


export type User = {
  id: string
  username: string
  pronouns?: string
  bio?: string
  country?: string
  city?: string
  avatar?: Image
  banner?: Image
  followers?: Follow[]
  collections?: Collection[]
  createdAt: Date
  updatedAt: Date
}


