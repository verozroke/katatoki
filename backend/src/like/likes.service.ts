import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service'; // Adjust the import path as necessary

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) { }

  async create(req: Request, res: Response, createLikeDto: CreateLikeDto) {
    const like = await this.prisma.like.create({
      data: createLikeDto
    });

    return res.send(JSON.stringify(like));
  }

  async findAll(req: Request, res: Response) {
    const likes = await this.prisma.like.findMany();
    return res.send(JSON.stringify(likes));
  }

  async findOne(req: Request, res: Response, id: string) {
    const like = await this.prisma.like.findUnique({
      where: { id }
    });

    if (!like) {
      throw new BadRequestException('Like not found');
    }

    return res.send(JSON.stringify(like));
  }

  async update(req: Request, res: Response, id: string, updateLikeDto: UpdateLikeDto) {
    const like = await this.prisma.like.update({
      where: { id },
      data: updateLikeDto
    });

    return res.send(JSON.stringify(like));
  }

  async remove(req: Request, res: Response, id: string) {
    await this.prisma.like.delete({
      where: { id }
    });

    return res.send({ message: 'Like successfully deleted' });
  }
}
