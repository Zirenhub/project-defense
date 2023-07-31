import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { selectAuthUser } from 'src/app/state/auth/auth.selectors';
import { openTweetModal } from 'src/app/state/tweets/tweet.actions';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
})
export class UserSidebarComponent {
  buttons = [
    { name: 'Home', onClick: () => this.router.navigateByUrl('/home') },
    { name: 'Explore', onClick: null },
    { name: 'Notifications', onClick: null },
    { name: 'Messages', onClick: null },
    { name: 'Lists', onClick: null },
    { name: 'Bookmarks', onClick: null },
    { name: 'Communities', onClick: null },
    { name: 'Verified', onClick: null },
    {
      name: 'Profile',
      onClick: () => this.router.navigateByUrl(`/profile/${this.user?._id}`),
    },
    { name: 'More', onClick: null },
  ];

  user: User | null = null;

  user$: Observable<User | null>;
  userSub: Subscription;

  constructor(private store: Store<AppState>, private router: Router) {
    this.user$ = this.store.select(selectAuthUser);

    this.userSub = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  handleOpenTweetModal() {
    this.store.dispatch(openTweetModal());
  }
}
