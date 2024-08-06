import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class SignatureStrategy {
  verifyLaunchParams(url: string): boolean {
    try {
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
    } catch {
      return false;
    }
  }
}
