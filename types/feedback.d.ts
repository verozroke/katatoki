import type { Collection } from "./collection"

export type Like = {
  id: string
  userId: string
  postId: string
}

export type Follow = {
  id: string
  followerId: string
  userId: string
}

export type Hashtag = {
  id: string
  name: string
  collections: Collection[]
}
