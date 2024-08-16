import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        return next.handle().pipe(
            map((data) => ({
                result: data.result || true,
                status: data.status || response.statusCode || HttpStatus.OK, // Get response status code
                data: typeof data === 'number' ? { value: data } : data,     // Get response data (format numbers)
                error: null,
                timestamp: new Date().toISOString(),
                path     : request.url
            })),
            catchError((error) => {
                // Handle http errors
                return new Observable((observer) => {
                    observer.next({
                        result: false,
                        status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
                        data: null,
                        error: error.message,
                        timestamp: new Date().toISOString(),
                        path     : request.url
                    });
                    observer.complete();
                });
            }),
        );
    }
}
