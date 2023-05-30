import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Counter, Histogram } from 'prom-client';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  private totalRequestCounter: Counter;
  private requestDuration: Histogram;

  constructor() {
    this.totalRequestCounter = new Counter({
      name: 'total_requests_count',
      help: 'Total number of requests',
      labelNames: ['total'],
    });

    this.requestDuration = new Histogram({
      name: 'request_duration',
      help: 'Duration of NATS requests in seconds',
      labelNames: ['duration'],
    });
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();

    this.totalRequestCounter.inc();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        this.requestDuration.observe(duration);
      }),
    );
  }
}
