import { Controller, UseGuards } from '@nestjs/common';
import { ReferralSystemService } from './referral-system.service';
import { SignatureGuard } from '@/guards';

@Controller('referral-system')
@UseGuards(SignatureGuard)
export class ReferralSystemController {
    constructor(
        private readonly referralSystemService: ReferralSystemService,
    ) {
    }
}
