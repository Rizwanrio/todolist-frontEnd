import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
/*import { CookieService } from 'ngx-cookie-service';

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService); // Inject CookieService directly here
 /* const csrfToken = cookieService.get('XSRF-TOKEN'); // Adjust the cookie name as needed

  // Clone the request to add the CSRF token header if it exists
  const modifiedReq = csrfToken
    ? req.clone({
        headers: req.headers.set('X-XSRF-TOKEN', csrfToken), // Set your CSRF header
      })
    : req;

  return next(modifiedReq);
};
*/
