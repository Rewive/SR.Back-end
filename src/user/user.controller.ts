import { Controller, Post, Req, Res, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Response, Request } from 'express';
import { SignatureGuard } from '../guards';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  @UseGuards(SignatureGuard)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async handleUser(@Req() req: Request, @Res() res: Response, @Body() body: any) {
    try {
      const result = await this.userService.handleUser(req.headers['authorization'], body);
      return res.status(result.code).json(result);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}
