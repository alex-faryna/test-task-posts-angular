import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPosts, selectState } from './state/selectors.state';
import { AppState, PostsState } from './state/reducers.state';
import { addPost } from './state/actions.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-task-posts-angular';

  constructor(private store: Store<AppState>) {
    this.store.select(selectPosts).subscribe(console.log);

    setTimeout(() => {
      this.store.dispatch(addPost({ title: 'Sample title', body: 'Sample body' }));
    }, 2000);
  }
}
