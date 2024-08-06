import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas';
import { SignatureStrategy } from '../strategy';

interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  bdate?: string;
  bdate_visibility?: number;
  country?: string;
  timezone?: number;
  photo_200?: string;
  photo_max_orig?: string;
  sex?: number;
  photo_100?: string;
  photo_base?: string;
  can_access_closed?: boolean;
  is_closed?: boolean;
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly signatureStrategy: SignatureStrategy
  ) {}

  async findOrCreateUser(userData: UserData): Promise<User> {
    let user = await this.userModel.findOne({ uid: userData.id }).exec();
    if (!user) {
      user = new this.userModel({
        uid: userData.id,
        first_name: userData.first_name,
        last_name: userData.last_name,
        bdate: userData.bdate,
        bdate_visibility: userData.bdate_visibility,
        country: userData.country,
        timezone: userData.timezone,
        photo_200: userData.photo_200,
        photo_max_orig: userData.photo_max_orig,
        sex: userData.sex,
        photo_100: userData.photo_100,
        photo_base: userData.photo_base,
        can_access_closed: userData.can_access_closed,
        is_closed: userData.is_closed,
        voites: 0,
        social_reting: 0,
      });
      await user.save();
    }
    return user;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handleUser(query: any, body: unknown): Promise<{ code: number; voites: number; social_reting: number; uid: string }> {
    const isValid = this.signatureStrategy.verifyLaunchParams(query);
    if (!isValid) {
      throw new Error('Invalid signature');
    }

    if (this.isUserData(body)) {
      const user = await this.findOrCreateUser(body);

      return {
        code: user ? 200 : 201,
        voites: user.voites,
        social_reting: user.social_reting,
        uid: user.uid,
      };
    } else {
      throw new Error('Invalid user data');
    }
  }

  private isUserData(data: unknown): data is UserData {
    return typeof data === 'object' && data !== null && 'id' in data && 'first_name' in data && 'last_name' in data;
  }
}
