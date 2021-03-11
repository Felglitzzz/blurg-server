import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserModel } from './../models/user.model';

@Injectable()
@EntityRepository(UserModel)
export class UserRepository extends Repository<UserModel> {
  async byIdWithProfile(id: string): Promise<UserModel> {
    return this.createQueryBuilder('users')
      .leftJoinAndSelect('users.profile', 'profile')
      .where('users.id = :id', { id: id })
      .getOne();
  }

  async byId(id: string): Promise<UserModel> {
    return this.findOne({ id });
  }

  async byEmail(email: string): Promise<UserModel> {
    return this.findOne({ email });
  }
}
