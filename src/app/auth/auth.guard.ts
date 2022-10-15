import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { catchError, map, Observable, skipWhile, take, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { SignoutComponent } from './signout/signout.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.signedIn$.pipe(
      skipWhile(val => val === null),
      tap((val) => {
        if(!val) this.router.navigateByUrl('/')
      }),
      take(1)
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.signedIn$.pipe(
      skipWhile(val => val === null),
      map(val => !val),
      tap((val) => {
        if(!val) this.router.navigateByUrl('/home')
      }),
      take(1)
    );
  }

}
