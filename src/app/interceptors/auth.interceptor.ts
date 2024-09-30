import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AccountService } from '../main/account/account.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('/auth/refresh')) {
      return next.handle(request);
    }
  
    const token = this.accountService.getAccessToken();
    
    if (token) {
      if (this.isTokenExpired(token)) {
        return this.accountService.refreshToken().pipe(
          switchMap(() => {
            const newToken = this.accountService.getAccessToken();
            const clonedRequest = request.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            return next.handle(clonedRequest);
          }),
          catchError((err: HttpErrorResponse) => {
            return throwError(() => err);
          })
        );
      } else {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }
    return next.handle(request);
  }
  
  private isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() > exp;
  }
}