import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { BlogModel } from '../models/blog.model';

@Injectable()
@EntityRepository(BlogModel)
export class BlogRepository extends Repository<BlogModel> {}
