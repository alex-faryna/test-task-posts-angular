import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap, takeUntil } from 'rxjs';
import { loadPost } from 'src/app/state/actions.state';
import { AppState } from 'src/app/state/models.state';
import { selectPost, selectPosts } from 'src/app/state/selectors.state';
import { UnsubscribeService } from 'src/app/utils/destroy.service';


@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
  providers: [UnsubscribeService],
})
export class PostPageComponent {

  public post$ = this.store.select(selectPost);

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private unsub$: UnsubscribeService,
  ) {
    this.route.params.pipe(
      takeUntil(this.unsub$)
    ).subscribe(({ id }) => this.store.dispatch(loadPost({ id })));
  }
}
