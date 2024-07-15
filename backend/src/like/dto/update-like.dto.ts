import { PartialType } from '@nestjs/mapped-types';
import { CreateLikeDto } from './create-like.dto';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateLikeDto extends PartialType(CreateLikeDto) {
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
