import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@/dto';
import { HttpStatusCode } from 'axios';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('register')
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
