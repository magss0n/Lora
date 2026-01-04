import { HttpInterceptorFn } from '@angular/common/http';

export const offlineInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
