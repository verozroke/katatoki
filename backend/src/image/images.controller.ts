import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Request, Response } from 'express';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Post()
  create(req: Request, res: Response, @Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(req, res, createImageDto);
  }

  @Get()
  findAll(req: Request, res: Response) {
    return this.imagesService.findAll(req, res);
  }

  @Get(':id')
  findOne(req: Request, res: Response, @Param('id') id: string) {
    return this.imagesService.findOne(req, res, id);
  }

  @Patch(':id')
  update(req: Request, res: Response, @Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(req, res, id, updateImageDto);
  }

  @Delete(':id')
  remove(req: Request, res: Response, @Param('id') id: string) {
    return this.imagesService.remove(req, res, id);
  }
}
