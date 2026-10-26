import {
  HttpInterceptorFn
} from '@angular/common/http';

import {
  catchError,
  throwError
} from 'rxjs';

export const errorInterceptor:
HttpInterceptorFn =
(req, next) => {

  return next(req)
    .pipe(

      catchError(error => {

        if (error.status === 403) {

          alert(
            'Access Denied'
          );
        }

        if (error.status === 500) {

          alert(
            'Internal Server Error'
          );
        }

        return throwError(
          () => error
        );
      })
    );
};