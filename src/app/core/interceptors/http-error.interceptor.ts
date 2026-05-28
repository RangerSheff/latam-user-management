import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('[HTTP ERROR]', {
        status: error.status,
        message: error.message,
        url: error.url,
      });

      return throwError(() => error);
    }),
  );
};
