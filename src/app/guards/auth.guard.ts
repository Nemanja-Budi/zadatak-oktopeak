import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { Observable, map, of } from 'rxjs';
import { MainService } from '../main/main.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {

  mainService: MainService = inject(MainService);
  router: Router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.tokenExist(state);
  }

  canMatch(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.tokenExist(state);
  }

  private tokenExist(state: RouterStateSnapshot): Observable<boolean> {
    const token = this.mainService.getAccessToken();
    if(token) {
      return  of(true);
    } else {
      this.router.navigate(['login']);
      return of(false);
    }
  }
}