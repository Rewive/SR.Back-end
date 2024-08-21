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
                        queryParams.push({key, value: query[key]});
                    }
                }
            }

            // No sign or no query params in url
            if (!sign || queryParams.length === 0) {
                return false;
            }

            // Transform query params to url query string for url
            const queryString = queryParams
                .sort((a, b) => a.key.localeCompare(b.key))
                .reduce((acc, {key, value}, idx) => {
                    return acc + (idx === 0 ? '' : '&') + `${key}=${encodeURIComponent(value)}`;
                }, '');

            // Hash query string
            const paramsHash = crypto
                .createHmac('sha256', process.env.VK_SECRET_KEY)
                .update(queryString)
                .digest('base64')
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=$/, '');

            // console.log(queryParams, paramsHash, sign);

            // Compare the hash
            return paramsHash === sign;
        } catch {
            return false;
        }
    }
}
