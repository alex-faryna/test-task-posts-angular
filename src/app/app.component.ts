import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPosts } from './state/selectors.state';
import { AppState } from './state/models.state';
import { addPost, loadPosts } from './state/actions.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private store: Store<AppState>) {
    this.store.select(selectPosts).subscribe(console.log);

    this.store.dispatch(loadPosts({ params: {
      paginate: {
        page: 2,
        limit: 20
      },
      search: {
        q: "qua"
      }
    } }));
  }
}
