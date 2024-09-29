import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Login } from '../models/login.model';
import { ProductsResponse } from '../models/product-response.model';
import { getDefaultPagination, PaginationType } from '../shared/types/pagination.type';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  
  pagination: PaginationType = getDefaultPagination();

  productPaginationSubject: BehaviorSubject<PaginationType> = new BehaviorSubject<PaginationType>(this.pagination);
  productSearchSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  totalPages: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  isDark: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  router: Router = inject(Router);

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
    this.router.navigate(['login']);
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      return this.http.post<any>('https://dummyjson.com/auth/refresh', {
        refreshToken,
        expiresInMins: 1
      }).pipe(
        tap(response => {
          // Sačuvaj nove tokene
          console.log('pozivam se');
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

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  

  // getAllProducts(): Observable<ProductsResponse> {

  //   return this.http.get<ProductsResponse>(`https://dummyjson.com/products?skip=0&limit=12`);
  // }


  // getAllProducts(): Observable<ProductsResponse> {
  //   return this.productPaginationSubject.pipe(
  //     switchMap(params => {
  //       const options = {
  //         params: new HttpParams()
  //           .set('limit', params.limit || 12)
  //           .set('skip', params.skip || 0)
  //       };
  //       return this.http.get<ProductsResponse>(`https://dummyjson.com/products`, options);
  //     })
  //   );
  // }


  getAllProducts(): Observable<ProductsResponse> {
    return this.productPaginationSubject.pipe(
      switchMap(params => {
        let httpParams = new HttpParams();
        Object.keys(params).forEach(key => {
          const value = params[key];
          httpParams = httpParams.append(key, value);
        });        
        return this.http.get<ProductsResponse>(`https://dummyjson.com/products`, { params: httpParams }).pipe(map((products) => {
          this.totalPages.next(Math.ceil(products.total/12));
          return products;
        }))
      })
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`https://dummyjson.com/products/${id}`);
  }

  searchProducts(): Observable<ProductsResponse> {
    return this.productSearchSubject.pipe(
      switchMap(params => {
        const options = {
          params: new HttpParams()
            .set('q', params || '')
          };
        return this.http.get<ProductsResponse>(`https://dummyjson.com/products/search`, options).pipe(map((products) => {
          this.totalPages.next(Math.ceil(products.total/12));
          return products;
        }));
      })
    );
  }
  
}

