import { PartialType } from '@nestjs/mapped-types';
import { CreateImageDto } from './create-image.dto';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class UpdateImageDto extends PartialType(CreateImageDto) {
  @IsNotEmpty()
  @IsString()
  id: string
  @IsNotEmpty()
  @IsString()
  url: string

  @IsNotEmpty()
  @IsDate()
  createdAt: Date

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date
}
