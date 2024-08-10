import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface IVkQueryParams {
    vk_user_id?: string;
}

export const GetVkUserId = createParamDecorator(
    (userProperty: string | undefined, context: ExecutionContext) => {
        // Get launch params
        const request = context.switchToHttp().getRequest();
        const url = request.headers['authorization'];

        const parsedUrl = new URL(url);
        const query = Object.fromEntries(parsedUrl.searchParams.entries());

        const queryParams: IVkQueryParams = {};

        for (const key in query) {
            if (Object.prototype.hasOwnProperty.call(query, key)) {
                if (key.startsWith('vk_')) {
                    queryParams[key] = query[key];
                }
            }
        }

        // Get vk user id
        const vkUserId = queryParams.vk_user_id ?? null;
        return vkUserId;
    },
);