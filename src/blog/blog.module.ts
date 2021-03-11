import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogRepository } from './repositories/blog.repository';
import { BlogResolver } from './resolvers/blog.resolver';
import { BlogService } from './services/blog.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlogRepository])],
  providers: [BlogService, BlogResolver],
  exports: [BlogService],
})
export class BlogModule {}
