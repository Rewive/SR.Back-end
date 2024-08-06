import { Controller, Post, Req, Res, Headers, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handleUser(@Req() req: Request, @Res() res: Response, @Headers('Authorization') authHeader: string, @Body() body: any) {
    const query = authHeader;

    try {
      const result = await this.userService.handleUser(query, body);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}