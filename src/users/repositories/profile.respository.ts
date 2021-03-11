import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ProfileModel } from '../models/profile.model';

@Injectable()
@EntityRepository(ProfileModel)
export class ProfileRepository extends Repository<ProfileModel> {}
