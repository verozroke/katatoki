import { BadRequestException, Body, ForbiddenException, Injectable, NotFoundException, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { ChangePasswordDto, ChangeNameDto, ChangeEmailDto, UploadAvatarDto, ChangeCountryDto, ChangeFullNameDto, ChangeBioDto, UploadBannerDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }

  async getUserById(id: string, req: Request) {
    const user = await this.prisma.user.findUnique({ where: { id } })

    if (!user) {
      throw new NotFoundException()
    }

    const decodedUser = req.user as { id: string, nickname: string }
    if (user.id !== decodedUser.id) {
      throw new ForbiddenException()
    }


    delete user.hashedPassword


    return { user }
  }

  async getUserByHash(req: Request) {

    const decodedUser = req.user as { id: string, nickname: string }
    const user = await this.prisma.user.findUnique({
      where: { id: decodedUser.id }, include: {
        subscribers: true,
        avatar: true,
        banner: true,
      }
    })
    if (!user) {
      throw new NotFoundException()
    }

    delete user.hashedPassword

    return { user }
  }

  async changePassword(@Param() params: { id: string }, @Body() body: ChangePasswordDto, @Req() req: Request, @Res() res: Response) {
    const { id } = params
    const { newPassword, oldPassword } = body

    const foundUser = await this.prisma.user.findUnique({
      where: {
        id,
      }
    })

    if (!foundUser) {
      throw new BadRequestException('No user found for id' + id)
    }

    const isMatch = await this.comparePasswords({
      password: oldPassword,
      hash: foundUser.hashedPassword
    })

    if (!isMatch) {
      throw new BadRequestException('Incorrect password')
    }

    const hashedPassword = await this.hashPassword(newPassword)


    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        hashedPassword,
      }
    })


    return res.send({ message: 'Changed password successfully' })

  }

  async changeName(@Param() params: { id: string }, @Body() body: ChangeNameDto, @Req() req: Request, @Res() res: Response) {
    const { id } = params
    const { nickname } = body

    const foundUser = await this.prisma.user.findUnique({
      where: {
        id,
      }
    })

    if (!foundUser) {
      throw new BadRequestException('No user found for id' + id)
    }

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        nickname,
      }
    })

    return res.send({ message: 'Changed name successfully' })
  }

  async changeEmail(@Param() params: { id: string }, @Body() body: ChangeEmailDto, @Req() req: Request, @Res() res: Response) {
    const { id } = params
    const { email } = body

    const foundUser = await this.prisma.user.findUnique({
      where: {
        id,
      }
    })

    if (!foundUser) {
      throw new BadRequestException('No user found for id' + id)
    }

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
      }
    })

    return res.send({ message: 'Changed email successfully' })
  }


  async changeFullName(@Param() params: { id: string }, @Body() { fullName }: ChangeFullNameDto, @Req() req: Request, @Res() res: Response) {
    const { id } = params

    const foundUser = await this.prisma.user.findUnique({
      where: {
        id,
      }
    })

    if (!foundUser) {
      throw new BadRequestException('No user found for id' + id)
    }

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        fullName,
      }
    })

    return res.send({ message: 'Changed fullName successfully' })
  }


  async changeBio(@Param() params: { id: string }, @Body() { bio }: ChangeBioDto, @Req() req: Request, @Res() res: Response) {
    const { id } = params

    const foundUser = await this.prisma.user.findUnique({
      where: {
        id,
      }
    })

    if (!foundUser) {
      throw new BadRequestException('No user found for id' + id)
    }

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        bio,
      }
    })

    return res.send({ message: 'Changed bio successfully' })
  }

  async changeCountry(@Param() params: { id: string }, @Body() { country }: ChangeCountryDto, @Req() req: Request, @Res() res: Response) {
    const { id } = params

    const foundUser = await this.prisma.user.findUnique({
      where: {
        id,
      }
    })

    if (!foundUser) {
      throw new BadRequestException('No user found for id' + id)
    }


    const foundCountry = await this.prisma.country.findFirst({
      where: {
        name: country
      }
    })

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        countryId: foundCountry.id
      }
    })

    return res.send({ message: 'Changed country successfully' })
  }


  async deleteUser(@Param() params: { id: string }, @Req() req: Request, @Res() res: Response) {

    const { id } = params

    const foundUser = await this.prisma.user.findUnique({
      where: {
        id,
      }
    })

    if (!foundUser) {
      throw new BadRequestException('No user found for id' + id)
    }

    await this.prisma.user.delete({
      where: {
        id,
      }
    })

    return res.send({ message: 'User deleted successfully' })
  }

  async uploadAvatar(@Param() params: { id: string }, @Body() body: UploadAvatarDto, @Req() req: Request, @Res() res: Response) {
    const { id } = params


    const foundUser = await this.prisma.user.findUnique({
      where: {
        id,
      }
    })

    if (!foundUser) {
      throw new BadRequestException('No user found for id' + id)
    }


    const foundAvatar = await this.prisma.image.findUnique({
      where: {
        id: foundUser.avatarId ? foundUser.avatarId : ''
      }
    })

    if (foundAvatar) {
      await this.prisma.image.delete({
        where: {
          id: foundAvatar.id
        }
      })
    }

    const createdImage = await this.prisma.image.create({
      data: {
        url: body.avatarUrl
      }
    })

    await this.prisma.user.update({
      where: {
        id
      },
      data: {
        avatarId: createdImage.id
      }
    })

    return res.send({ message: 'Avatar uploaded successfully' })
  }


  async uploadBanner(@Param() params: { id: string }, @Body() body: UploadBannerDto, @Req() req: Request, @Res() res: Response) {
    const { id } = params


    const foundUser = await this.prisma.user.findUnique({
      where: {
        id,
      }
    })

    if (!foundUser) {
      throw new BadRequestException('No user found for id' + id)
    }


    const foundBanner = await this.prisma.image.findUnique({
      where: {
        id: foundUser.bannerId ? foundUser.bannerId : ''
      }
    })

    if (foundBanner) {
      await this.prisma.image.delete({
        where: {
          id: foundBanner.id
        }
      })
    }

    const createdImage = await this.prisma.image.create({
      data: {
        url: body.bannerUrl
      }
    })

    await this.prisma.user.update({
      where: {
        id
      },
      data: {
        bannerId: createdImage.id
      }
    })

    return res.send({ message: 'Banner uploaded successfully' })
  }
  async getUsers() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        nickname: true,
        email: true
      }
    });
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds)

    return hashedPassword
  }


  async comparePasswords(args: { password: string, hash: string }) {
    return await bcrypt.compare(args.password, args.hash)
  }
}
