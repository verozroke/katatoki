import { IsNotEmpty, IsString, IsDate } from "class-validator"

export class Like {
  @IsNotEmpty()
  @IsString()
  id: string

  @IsNotEmpty()
  @IsString()
  userId: string

  @IsNotEmpty()
  @IsString()
  postId: string

  @IsNotEmpty()
  @IsDate()
  createdAt: Date

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date
}
