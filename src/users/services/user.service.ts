import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserModel } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(public repository: UserRepository) {}

  async getUserByEmail(email: string): Promise<UserModel> {
    return this.repository.byEmail(email);
  }

  async getUserById(id: string): Promise<UserModel> {
    return this.repository.byId(id);
  }

  async getUserByIdWithProfile(id: string): Promise<UserModel> {
    const user = await this.repository.byIdWithProfile(id);
    if (!user) {
      throw new UnauthorizedException(`User does not exist!`);
    }
    return user;
  }
}
