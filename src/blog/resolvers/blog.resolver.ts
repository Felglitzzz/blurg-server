import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { BlogModel } from '../models/blog.model';
import { BlogResponse, DeleteBlogInput, SaveBlogInput } from '../types';
import { BlogService } from '../services/blog.service';
import { CurrentUser } from '@blurg/src/shared/decorators/current-user.decorator';
import { UserModel } from '@blurg/src/users/models/user.model';
import { UseGuards } from '@nestjs/common';
import { GenericAuthGuard } from '@blurg/src/auth/guards/generic-auth.guard';

@UseGuards(GenericAuthGuard)
@Resolver('Blog')
export class BlogResolver {
  constructor(private blogService: BlogService) {}

  @Mutation(() => BlogModel)
  async saveBlog(
    @CurrentUser() user: UserModel,
    @Args({
      name: 'saveBlogInput',
      type: () => SaveBlogInput,
      nullable: false,
    })
    input: SaveBlogInput,
  ): Promise<BlogModel> {
    return this.blogService.saveBlog(user, input);
  }

  @Mutation(() => BlogModel)
  async deleteBlog(
    @CurrentUser() user: UserModel,
    @Args({
      name: 'deleteBlogInput',
      type: () => DeleteBlogInput,
      nullable: false,
    })
    input: DeleteBlogInput,
  ): Promise<BlogModel> {
    return this.blogService.deleteBlog(input);
  }

  @Query(() => BlogResponse)
  async fetchAllBlogs(): Promise<BlogResponse> {
    return this.blogService.fetchAllBlogs();
  }

  @Query(() => BlogModel)
  async fetchOneBlog(
    @Args({
      name: 'id',
      type: () => String,
      nullable: true,
    })
    id: string,
  ): Promise<BlogModel> {
    return this.blogService.fetchOneBlog(id);
  }
}
