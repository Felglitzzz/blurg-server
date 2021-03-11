import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import {
  BlogFilterInput,
  BlogResponse,
  DeleteBlogInput,
  SaveBlogInput,
} from '../types';
import { BlogRepository } from '../repositories/blog.repository';
import { BlogModel } from '../models/blog.model';
import { BlogCategoryModel } from '../models/blog-category.model';
import { ProfileModel } from '@blurg/src/users/models/profile.model';
import { UserModel } from '@blurg/src/users/models/user.model';

@Injectable()
export class BlogService {
  constructor(
    @Inject(BlogRepository) private readonly repository: BlogRepository,
    @Inject(EntityManager) readonly entityManager: EntityManager,
  ) {}

  async saveBlog(user: UserModel, input: SaveBlogInput) {
    const { categoryName, id } = input;
    let blog = {};

    if (id) {
      blog = await this.repository.findOne(id);
    }

    let category = await this.entityManager.findOne(BlogCategoryModel, {
      name: categoryName,
    });

    category = category || new BlogCategoryModel({ name: categoryName });

    return this.repository.save(
      new BlogModel({ ...blog, ...input, category, profile: user.profile }),
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

  async findByProfile(
    profile: ProfileModel,
    input: BlogFilterInput,
  ): Promise<BlogResponse> {
    const { skip, take, category } = input;

    const query = this.repository
      .createQueryBuilder('blogs')
      .leftJoinAndSelect('blogs.profile', 'profile')
      .leftJoinAndSelect('blogs.category', 'category')
      .where('profile.id = :profileId', { profileId: profile.id });

    if (category) {
      query.andWhere('blogs.category ILIKE :category', {
        category: `${category}%`,
      });
    }

    const responses = await query
      .skip(skip)
      .take(take)
      .orderBy('blogs.updatedDate', 'DESC')
      .getManyAndCount();

    return new BlogResponse(...responses);
  }

  async fetchAllBlogs(input: BlogFilterInput): Promise<BlogResponse> {
    const { category, skip, take } = input;
    const query = this.repository
      .createQueryBuilder('blogs')
      .leftJoinAndSelect('blogs.profile', 'profile')
      .leftJoinAndSelect('blogs.category', 'category');

    if (category) {
      query.where('blogs.category ILIKE :category', {
        category: `${category}%`,
      });
    }

    const responses = await query
      .skip(skip)
      .take(take)
      .orderBy('blogs.updatedDate', 'DESC')
      .getManyAndCount();

    return new BlogResponse(...responses);
  }
}
