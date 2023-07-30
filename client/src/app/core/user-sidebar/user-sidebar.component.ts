import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { selectAuthUser } from 'src/app/state/auth/auth.selectors';
import { User } from 'src/app/types/User';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
})
export class UserSidebarComponent {
  buttons = [
    'Home',
    'Explore',
    'Notifications',
    'Messages',
    'Lists',
    'Bookmarks',
    'Communities',
    'Verified',
    'Profile',
    'More',
  ];

  user$: Observable<User | null>;

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(selectAuthUser);
  }
}
