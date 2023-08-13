import { Component, HostBinding } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { AppState } from './state/models.state';
import { searchClear, searchPosts } from './state/actions.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private store: Store<AppState>) {

  }

  public search(query: string): void {
    this.store.dispatch(searchPosts({ query }));
  }

  public clear(): void {
    this.store.dispatch(searchClear());
  }
}
