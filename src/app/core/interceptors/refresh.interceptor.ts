import {
  HttpInterceptorFn
} from '@angular/common/http';

import {
  inject
} from '@angular/core';

import {
  catchError,
  switchMap,
  throwError
} from 'rxjs';

import {
  AuthService
} from '../services/auth.service';

export const refreshInterceptor:
HttpInterceptorFn =
(req, next) => {

  const authService =
    inject(AuthService);

  return next(req)
    .pipe(

      catchError(error => {

        if (error.status !== 401) {

          return throwError(
            () => error
          );
        }

        return authService
          .refreshToken()
          .pipe(

            switchMap(
              (response) => {

                authService.saveToken(
                  response.accessToken
                );

                authService.saveRefreshToken(
                  response.refreshToken
                );

                const clone =
                  req.clone({

                    setHeaders: {

                      Authorization:
                      `Bearer ${response.accessToken}`
                    }
                  });

                return next(clone);
              }
            )
          );
      })
    );
};