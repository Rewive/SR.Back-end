import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class AppService {
    async getPing() {
        const start = Date.now();
        try {
            if (mongoose.connection.readyState !== 1) {
                await mongoose.connect(process.env.MONGODB_URL);
            }

            const dbStart = Date.now();
            await mongoose.connection.db.admin().ping();
            const dbDuration = Date.now() - dbStart;
            const duration = Date.now() - start;
            return {
                status: 'ok',
                code: 200,
                responseTime: `${duration}ms`,
                dbResponseTime: `${dbDuration}ms`,
            };
        } catch (error) {
            return {
                status: 'error',
                code: 500,
                message: error.message,
            };
        }
    }
}
