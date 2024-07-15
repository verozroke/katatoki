import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Request, Response } from 'express';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) { }

  @Post()
  create(req: Request, res: Response, @Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(req, res, createLikeDto);
  }

  @Get()
  findAll(req: Request, res: Response) {
    return this.likesService.findAll(req, res);
  }

  @Get(':id')
  findOne(req: Request, res: Response, @Param('id') id: string) {
    return this.likesService.findOne(req, res, id);
  }

  @Patch(':id')
  update(req: Request, res: Response, @Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.update(req, res, id, updateLikeDto);
  }

  @Delete(':id')
  remove(req: Request, res: Response, @Param('id') id: string) {
    return this.likesService.remove(req, res, id);
  }
}
