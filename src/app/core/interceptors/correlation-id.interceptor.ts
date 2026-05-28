import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

const CORRELATION_ID_HEADER = 'X-Correlation-Id';

const createCorrelationId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export const correlationIdInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const request = req.clone({
    setHeaders: {
      [CORRELATION_ID_HEADER]: createCorrelationId(),
    },
  });

  return next(request);
};
