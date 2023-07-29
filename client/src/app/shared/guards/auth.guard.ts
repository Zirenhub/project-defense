import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs/operators';
import { AppState } from 'src/app/state/app.state';
import {
  selectAuthStatus,
  selectAuthUser,
} from 'src/app/state/auth/auth.selectors';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(selectAuthStatus).pipe(
      // wait for status
      filter((status) => status !== 'pending'),
      map((status) => {
        if (status === 'success') {
          // User is authenticated, allow access to all routes except /auth
          if (state.url === '/auth') {
            this.router.navigate(['/home']);
            return false;
          }
          return true;
        } else {
          // Authentication check failed, allow access to /auth only
          if (state.url !== '/auth') {
            this.router.navigate(['/auth']);
            return false;
          }
          return true;
        }
      })
    );
  }
}
