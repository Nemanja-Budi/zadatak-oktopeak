import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, take, throwError } from 'rxjs';
import { MainService } from '../main/main.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private mainService: MainService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ignorišemo zahteve za refresh token
    if (request.url.includes('/auth/refresh')) {
      return next.handle(request);
    }
  
    const token = this.mainService.getAccessToken();
    
    if (token) {
      // Proveri da li je token istekao i osveži ga ako je istekao
      if (this.isTokenExpired(token)) {
        return this.mainService.refreshToken().pipe(
          switchMap(() => {
            // Nakon osvežavanja tokena, kloniraj zahtev sa novim tokenom
            const newToken = this.mainService.getAccessToken();
            const clonedRequest = request.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            return next.handle(clonedRequest);
          }),
          catchError((err: HttpErrorResponse) => {
            // Ako osvežavanje ne uspe, vrati grešku
            return throwError(() => err);
          })
        );
      } else {
        // Ako token nije istekao, dodaj ga u zaglavlje
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }
  
    // Pusti zahtev dalje
    return next.handle(request);
  }
  

  private isTokenExpired(token: string): boolean {
    // Ovde možeš implementirati proveru da li je token istekao
    // Na primer, možeš parsirati JWT i proveriti njegov `exp` claim
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000; // Pretvori u milisekunde
    return Date.now() > exp;
  }
}