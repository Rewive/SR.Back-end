import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const error = exception.getResponse();

        response.status(status).json({
            result   : false,
            status   : status,
            error    : error.message,
            data     : null,

            // fullError: error,
            timestamp: new Date().toISOString(),
            path     : request.url
        });
    }
}