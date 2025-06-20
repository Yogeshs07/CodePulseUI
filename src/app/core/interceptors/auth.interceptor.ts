import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  if (shouldInterceptRequest(req)) {
    const token = cookieService.get('Authorization');
    const authReq = req.clone({
      setHeaders: {
        Authorization: token
      }
    });
    return next(authReq);
  }
  // If no auth required, pass request as-is
  return next(req);
};

function shouldInterceptRequest(request: HttpRequest<any>): boolean {
  return request.urlWithParams.includes('addAuth=true');
}
