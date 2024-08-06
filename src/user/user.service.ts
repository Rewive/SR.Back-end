import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async verifyLaunchParams(url: string): Promise<boolean> {
    const parsedUrl = new URL(url);
    const query = Object.fromEntries(parsedUrl.searchParams.entries());

    let sign: string | undefined;
    const queryParams: { key: string; value: string }[] = [];

    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        if (key === 'sign') {
          sign = query[key];
        } else if (key.startsWith('vk_')) {
          queryParams.push({ key, value: query[key] });
        }
      }
    }

    if (!sign || queryParams.length === 0) {
      return false;
    }

    const queryString = queryParams
      .sort((a, b) => a.key.localeCompare(b.key))
      .reduce((acc, { key, value }, idx) => {
        return acc + (idx === 0 ? '' : '&') + `${key}=${encodeURIComponent(value)}`;
      }, '');

    const paramsHash = crypto
      .createHmac('sha256', process.env.VK_SECRET_KEY)
      .update(queryString)
      .digest('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=$/, '');

    return paramsHash === sign;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async findOrCreateUser(userData: any): Promise<User> {
    let user = await this.userModel.findOne({ uid: userData.id }).exec();
    if (!user) {
        console.log("create dbn")
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
  async handleUser(query: any, body: any): Promise<{ code: number; voites: number; social_reting: number; uid: string }> {
    const isValid = await this.verifyLaunchParams(query);
    if (!isValid) {
      throw new Error('Invalid signature');
    }

    const user = await this.findOrCreateUser(body);

    return {
      code: user ? 200 : 201,
      voites: user.voites,
      social_reting: user.social_reting,
      uid: user.uid,
    };
  }
}