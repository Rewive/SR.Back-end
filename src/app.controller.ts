import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly pingService: AppService) {}

    @Get()
    getHello(): string {
        return 'Open /docs for docs';
    }

    @Get('ping')
    async getPing() {
        return this.pingService.getPing();
    }
}
