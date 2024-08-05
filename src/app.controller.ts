import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly pingService: AppService) {}

    @Get('ping')
    async getPing() {
        return this.pingService.getPing();
    }
}
