import { IsNotEmpty, IsString } from "class-validator"

export class CreateLikeDto {
  @IsNotEmpty()
  @IsString()
  userId: string

  @IsNotEmpty()
  @IsString()
  postId: string
}
