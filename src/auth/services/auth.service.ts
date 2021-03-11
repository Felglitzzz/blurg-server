import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { UserRegistrationInput } from '../types/inputs/registration.input';
import * as bcrypt from 'bcryptjs';
import { LoginInput } from '../types/inputs/login.input';
import { UserRegistrationResponse } from '../responses/registration.response';
import { EntityManager } from 'typeorm';
import { UserModel } from '../../users/models/user.model';
import { UserService } from 'src/users/services/user.service';
import { LoginResponse } from '../types/responses/login.response';
import { UserRepository } from '@blurg/src/users/repositories/user.repository';
import { inTransaction } from '@blurg/src/database/transaction';
import { UserType } from '@blurg/src/shared/enums/user-type.enum';
import { ProfileRepository } from '@blurg/src/users/repositories/profile.respository';
import { ProfileModel } from '@blurg/src/users/models/profile.model';
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';

@Injectable()
export class AuthService {
  salt = 10;
  serializableType: IsolationLevel = 'SERIALIZABLE';
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @Inject(EntityManager) readonly entityManager: EntityManager,
  ) {}

  private async createUserInTransaction(
    input: UserRegistrationInput,
    manager: EntityManager,
  ): Promise<UserRegistrationResponse> {
    const userRepository = manager.getCustomRepository(UserRepository);
    const profileRepository = manager.getCustomRepository(ProfileRepository);

    const { email, password, firstName, lastName } = input;
    const userPassword = await bcrypt.hash(password, this.salt);

    const user = new UserModel({
      email,
      role: UserType.USER,
      password: userPassword,
    });
    const savedUser = await userRepository.save(user);

    const profile = new ProfileModel({
      firstName,
      lastName,
    });
    profile.user = savedUser;

    await profileRepository.save(profile);

    const payload = { sub: savedUser.id, email: savedUser.email };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  async createUser(
    input: UserRegistrationInput,
  ): Promise<UserRegistrationResponse> {
    return inTransaction(
      this.entityManager,
      (manager) => this.createUserInTransaction(input, manager),
      this.serializableType,
    );
  }

  async validate(id: string): Promise<UserModel> {
    const user = await this.userService.getUserByIdWithProfile(id);
    if (!user) {
      throw new UnauthorizedException(`User does not exist!`);
    }
    return user;
  }

  async login(input: LoginInput): Promise<LoginResponse> {
    const user = await this.userService.getUserByEmail(input.email);
    if (!user) {
      throw new UnauthorizedException(
        'Signin Failed! Incorrect email or password',
      );
    }

    const isCorrectPassword = await bcrypt.compare(
      input.password,
      user.password,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException(
        'Signin Failed!, Incorrect email or password',
      );
    }
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
