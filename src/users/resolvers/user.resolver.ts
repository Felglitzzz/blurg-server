import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';
import { GenericAuthGuard } from '../../auth/guards/generic-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '@blurg/src/shared/decorators/current-user.decorator';
import { BlogService } from '@blurg/src/blog/services/blog.service';
import { BlogFilterInput, BlogResponse } from '@blurg/src/blog/types';

@UseGuards(GenericAuthGuard)
@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private userService: UserService,
    private blogService: BlogService,
  ) {}

  @Query(() => UserModel)
  async user(
    @CurrentUser() user: UserModel,
    @Args('id', { nullable: true })
    id?: string,
  ): Promise<UserModel> {
    const userid = id || user.id;
    return await this.userService.getUserByIdWithProfile(userid);
  }

  @ResolveField('blogs', () => BlogResponse, { nullable: true })
  async getBlogs(
    @Parent() user: UserModel,
    @Args({
      name: 'blogFilterInput',
      type: () => BlogFilterInput,
      nullable: true,
    })
    input: BlogFilterInput,
  ): Promise<BlogResponse> {
    return this.blogService.findByProfile(user.profile, input);
  }
}
