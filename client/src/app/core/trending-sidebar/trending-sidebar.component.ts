import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { logout } from 'src/app/state/auth/auth.actions';

@Component({
  selector: 'app-trending-sidebar',
  templateUrl: './trending-sidebar.component.html',
})
export class TrendingSidebarComponent {
  constructor(private store: Store<AppState>) {}

  logout() {
    this.store.dispatch(logout());
  }
}
