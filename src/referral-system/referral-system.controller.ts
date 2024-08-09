import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ReferralSystemService } from './referral-system.service';
import { GetVkUserId } from '@/user/decorator/get-vk-user-id.decorator';
import { UserService } from '@/user/user.service';
import { SignatureGuard } from '@/guards';

@Controller('referral-system')
@UseGuards(SignatureGuard)
export class ReferralSystemController {
    constructor(
        private readonly referralSystemService: ReferralSystemService,
        private readonly userService: UserService
    ) {
    }

    @Get('/:userId')
    async addReferral(
        @Param('userId') vkUserId: string,
        @GetVkUserId() referralId: string
    ) {

        return await this.referralSystemService.addReferral(
            vkUserId,
            referralId
        );
    }
}
