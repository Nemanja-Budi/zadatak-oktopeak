import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';
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

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<ProductsResponse> {
    return this.productPaginationSubject.pipe(
      switchMap(params => {
        let httpParams = new HttpParams();
        Object.keys(params).forEach(key => {
          const value = params[key];
          httpParams = httpParams.append(key, value);
        });        
        return this.http.get<ProductsResponse>(`https://dummyjson.com/products`, { params: httpParams }).pipe(map((products) => {
          this.totalPages.next(Math.ceil(products.total / 12));
          return products;
        }))
      })
    );
  }

  searchProducts(): Observable<ProductsResponse> {
    return combineLatest([this.productSearchSubject, this.productPaginationSubject]).pipe(
      switchMap(([searchParams, paginationParams]) => {
        const options = {
          params: new HttpParams()
            .set('q', searchParams || '')
            .set('limit', paginationParams.limit)
            .set('skip', paginationParams.skip)
        };
        return this.http.get<ProductsResponse>(`https://dummyjson.com/products/search`, options).pipe(
          map((products) => {
            this.totalPages.next(Math.ceil(products.total / 12));
            return products;
          })
        );
      })
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`https://dummyjson.com/products/${id}`);
  }
  
  setAndUpdateMode(isDark: boolean): void {
    let mode = isDark == true ? 'Dark' : 'Light'
    this.isDark.next(isDark);
    localStorage.setItem('Mode', mode);
  }

  getMode(): string | null {
    return localStorage.getItem('Mode');
  }

}

