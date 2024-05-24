import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { CollectionModule } from './collection/collection.module';
import { PostModule } from './post/post.module';
import { ImageModule } from './image/image.module';
import { LikeModule } from './like/like.module';
import { FollowModule } from './follow/follow.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [AuthModule, UserModule, CollectionModule, PostModule, ImageModule, LikeModule, FollowModule, HashtagModule, PrismaModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule { }
