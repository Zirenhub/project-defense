import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/state/app.state';
import { selectAuthUser } from 'src/app/state/auth/auth.selectors';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.select(selectAuthUser).pipe(
      map((user) => {
        if (user) {
          // User is authenticated, allow navigation
          return true;
        } else {
          // User is not authenticated, redirect to /auth
          this.router.navigateByUrl('/auth');
          return false;
        }
      })
    );
  }
}
