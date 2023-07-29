import { Component } from '@angular/core';
import { AppState } from './state/app.state';
import { Store } from '@ngrx/store';
import { checkAuth } from './state/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private store: Store<AppState>) {
    this.store.dispatch(checkAuth());
  }
}
