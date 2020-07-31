import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { AuthStoreService } from './auth-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private authStore: AuthStoreService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.authStore.getCurrentUser()
      .pipe(
        map(res => {
          if (res.data!.me) {
            console.log(res.data.me);
            return true;
          } else {
            console.log(res);
            this.router.navigate(['/home'], {
              queryParams: {
                return: state.url
              }
            });
            return false;
          }
        })
      );
  }
}