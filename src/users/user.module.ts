import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { ProfileRepository } from './repositories/profile.respository';
import { BlogModule } from '../blog/blog.module';
@Module({
  imports: [
    BlogModule,
    TypeOrmModule.forFeature([UserRepository]),
    TypeOrmModule.forFeature([ProfileRepository]),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
