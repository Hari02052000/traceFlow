import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error?: {
    code: string;
    message: string;
  };
}

export const responseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse) {
        const body = event.body;
        if (body && typeof body === 'object' && 'success' in body) {
          const apiBody = body as ApiResponse<unknown>;

          if (apiBody.pagination) {
            return event.clone({
              body: {
                data: apiBody.data,
                ...apiBody.pagination,
              },
            });
          }

          return event.clone({
            body: apiBody.data,
          });
        }
      }
      return event;
    }),
  );
};
