import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { logout } from 'src/app/state/auth/auth.actions';
import { selectAuthUser } from 'src/app/state/auth/auth.selectors';
import { getTrending } from 'src/app/state/timeline/timeline.actions';
import { selectTimelineTrending } from 'src/app/state/timeline/timeline.selectors';
import { Tweet } from 'src/app/types/Tweet';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-trending-sidebar',
  templateUrl: './trending-sidebar.component.html',
})
export class TrendingSidebarComponent implements OnDestroy {
  auth$: Observable<User | null>;
  trending$: Observable<Tweet[] | null>;

  authSub: Subscription;

  constructor(private store: Store<AppState>, private router: Router) {
    this.store.dispatch(getTrending());
    this.auth$ = this.store.select(selectAuthUser);
    this.trending$ = this.store.select(selectTimelineTrending);

    this.authSub = this.auth$.subscribe((user) => {
      if (!user) {
        window.location.reload();
      }
    });
  }

  handleNavigateTweet(id: string) {
    this.router.navigateByUrl(`/tweet/${id}`);
  }

  logout() {
    this.store.dispatch(logout());
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
