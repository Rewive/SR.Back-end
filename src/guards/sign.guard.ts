import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { SignatureStrategy } from '@/common';

@Injectable()
export class SignatureGuard implements CanActivate {
    constructor(private readonly signatureStrategy: SignatureStrategy) {
    }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const url = request.headers['authorization']; // или другой источник URL

        return this.signatureStrategy.verifyLaunchParams(url);
    }
}
