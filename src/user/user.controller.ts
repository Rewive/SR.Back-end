import {
    Controller,
    UseGuards,
    Get,
    Param, Post, Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignatureGuard } from '@/guards';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetVkUserId } from '@/user/decorator';

@Controller('users')
@UseGuards(SignatureGuard)
@ApiTags('Users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    @Get('/:id')
    async getUserById(
        @Param('id') userId: string
    ) {
        return await this.userService.getUserById(userId);
    }

    @Post('/change-user-leaderboard-visibility')
    @ApiOperation({ summary: 'Change user leaderboard visibility' })
    @ApiBody({
        description: 'Request payload to change visibility',
        schema     : {
            type      : 'object',
            properties: {
                visibility: { type: 'boolean' },
            },
        },
    })
    async changeUserLeaderboardVisibility(
        @GetVkUserId() vkUserId: string,
        @Body('visibility') visibility: boolean
    ) {
        return await this.userService.changeUserLeaderboardVisibility(vkUserId, visibility);
    }
}
