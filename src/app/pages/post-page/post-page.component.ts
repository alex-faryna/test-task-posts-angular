import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/models.state';
import { selectPosts } from 'src/app/state/selectors.state';


@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPageComponent {

  constructor(private store: Store<AppState>) {
    this.store.select(selectPosts).subscribe(console.log);

  }
}
