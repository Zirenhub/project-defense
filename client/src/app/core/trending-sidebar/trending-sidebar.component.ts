import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { logout } from 'src/app/state/auth/auth.actions';
import { selectAuthUser } from 'src/app/state/auth/auth.selectors';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-trending-sidebar',
  templateUrl: './trending-sidebar.component.html',
})
export class TrendingSidebarComponent implements OnDestroy {
  auth$: Observable<User | null>;

  authSub: Subscription;

  constructor(private store: Store<AppState>) {
    this.auth$ = this.store.select(selectAuthUser);

    this.authSub = this.auth$.subscribe((user) => {
      if (!user) {
        window.location.reload();
      }
    });
  }

  logout() {
    this.store.dispatch(logout());
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
