import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { BlogResponse, DeleteBlogInput, SaveBlogInput } from '../types';
import { BlogRepository } from '../repositories/blog.repository';
import { BlogModel } from '../models/blog.model';
import { ProfileModel } from '@blurg/src/users/models/profile.model';
import { UserModel } from '@blurg/src/users/models/user.model';

@Injectable()
export class BlogService {
  constructor(
    @Inject(BlogRepository) private readonly repository: BlogRepository,
    @Inject(EntityManager) readonly entityManager: EntityManager,
  ) {}

  async saveBlog(user: UserModel, input: SaveBlogInput) {
    const { id } = input;
    let blog = {};

    if (id) {
      blog = await this.repository.findOne(id);
    }

    return this.repository.save(
      new BlogModel({ ...blog, ...input, profile: user.profile }),
    );
  }

  async deleteBlog(input: DeleteBlogInput): Promise<BlogModel> {
    const { id } = input;

    const blog = await this.repository.findOne(id);

    if (!blog) {
      throw new NotFoundException('Blog does not exist!');
    }

    await this.repository.delete(blog);
    return blog;
  }

  async findByProfile(profile: ProfileModel): Promise<BlogResponse> {
    const query = this.repository
      .createQueryBuilder('blogs')
      .leftJoinAndSelect('blogs.profile', 'profile')
      .where('profile.id = :profileId', { profileId: profile.id });

    const responses = await query
      .orderBy('blogs.updatedDate', 'DESC')
      .getManyAndCount();

    return new BlogResponse(...responses);
  }

  async fetchAllBlogs(): Promise<BlogResponse> {
    const query = this.repository
      .createQueryBuilder('blogs')
      .leftJoinAndSelect('blogs.profile', 'profile');

    const responses = await query
      .orderBy('blogs.updatedDate', 'DESC')
      .getManyAndCount();

    return new BlogResponse(...responses);
  }

  async fetchOneBlog(id: string): Promise<BlogModel> {
    const blog = await this.repository.findOne(id);
    if (!blog) {
      throw new NotFoundException('Blog Does Not Exist!');
    }
    return blog;
  }
}
