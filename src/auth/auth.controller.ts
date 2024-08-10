import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@/dto';
import { HttpStatusCode } from 'axios';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('register')
    @ApiOperation({ summary: 'Create new user, handle referrals' })
    @HttpCode(HttpStatusCode.Created)
    async createUser(
        @Body() body: CreateUserDto
    ) {
        try {
            const result = await this.authService.createUser(
                body
            );

            return result;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
