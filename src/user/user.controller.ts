import {
    Controller,
    Post,
    Req,
    Res,
    Body,
    UseGuards,
    BadRequestException,
    Get,
    Param,
    HttpCode
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { SignatureGuard } from '@/guards';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@/dto';
import { HttpStatusCode } from 'axios';

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

    @Post('create')
    @HttpCode(HttpStatusCode.Created)
    async createUser(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: CreateUserDto
    ) {
        try {
            const result = await this.userService.createUser(
                body
            );

            return result;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get(':id/get-friends')
    async getFriends(
        @Param('id') userId: number
    ) {
        return 'Get friends of user with id = ' + userId;
    }
}
