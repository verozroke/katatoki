import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service'; // Adjust the import path as necessary

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) { }

  async create(req: Request, res: Response, createImageDto: CreateImageDto) {
    const image = await this.prisma.image.create({
      data: createImageDto
    });

    return res.send(JSON.stringify(image));
  }

  async findAll(req: Request, res: Response) {
    const images = await this.prisma.image.findMany();
    return res.send(JSON.stringify(images));
  }

  async findOne(req: Request, res: Response, id: string) {
    const image = await this.prisma.image.findUnique({
      where: { id }
    });

    if (!image) {
      throw new BadRequestException('Image not found');
    }

    return res.send(JSON.stringify(image));
  }

  async update(req: Request, res: Response, id: string, updateImageDto: UpdateImageDto) {
    const image = await this.prisma.image.update({
      where: { id },
      data: updateImageDto
    });

    return res.send(JSON.stringify(image));
  }

  async remove(req: Request, res: Response, id: string) {
    await this.prisma.image.delete({
      where: { id }
    });

    return res.send({ message: 'Image successfully deleted' });
  }
}
