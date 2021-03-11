import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  ConflictException,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err?.code === '23505')
          throw new ConflictException('Record already exists!');
        return throwError(err);
      }),
    );
  }
}
