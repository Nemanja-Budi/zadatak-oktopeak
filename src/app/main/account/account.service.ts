import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<User>{
    return this.http.get<User>(`https://dummyjson.com/auth/me`);
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<any>(`https://dummyjson.com/auth/login`, {
      username,
      password,
      expiresInMins: 1
    }).pipe(
      tap(response => {
        localStorage.setItem('AccessToken', response.accessToken);
        localStorage.setItem('RefreshToken', response.refreshToken);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('RefreshToken');
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      return this.http.post<any>('https://dummyjson.com/auth/refresh', {
        refreshToken,
        expiresInMins: 1
      }).pipe(
        tap(response => {
          localStorage.setItem('AccessToken', response.accessToken);
          localStorage.setItem('RefreshToken', response.refreshToken);
        })
      );
    }
    return throwError(() => new Error('No refresh token available'));
  }
  
  getRefreshToken(): string | null {
    return localStorage.getItem('RefreshToken');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('AccessToken');
  }

}
