import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/models.state';
import { selectPosts } from 'src/app/state/selectors.state';


@Component({
  selector: 'app-posts-list-page',
  templateUrl: './posts-list-page.component.html',
  styleUrls: ['./posts-list-page.component.scss'],
  standalone: true,
})
export class PostsListPageComponent {

  constructor(private store: Store<AppState>) {
    this.store.select(selectPosts).subscribe(console.log);

  }
}
