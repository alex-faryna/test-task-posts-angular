import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadPosts } from 'src/app/state/actions.state';
import { AppState } from 'src/app/state/models.state';
import { selectPosts } from 'src/app/state/selectors.state';


@Component({
  selector: 'app-posts-list-page',
  templateUrl: './posts-list-page.component.html',
  styleUrls: ['./posts-list-page.component.scss'],
  standalone: true,
})
export class PostsListPageComponent {

  public queryParams = {
    page: 1,
    limit: 10,
  };


  constructor(private store: Store<AppState>) {
    this.store.select(selectPosts).subscribe(console.log);

    this.store.dispatch(loadPosts({ params: {
      paginate: this.queryParams,
      search: {
        q: "qua"
      }
    } }));
  }
}
