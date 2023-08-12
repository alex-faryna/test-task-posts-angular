import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadMorePosts } from 'src/app/state/actions.state';
import { AppState } from 'src/app/state/models.state';
import { selectLoading, selectPosts } from 'src/app/state/selectors.state';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { tap } from 'rxjs';


@Component({
    selector: 'app-posts-list-page',
    templateUrl: './posts-list-page.component.html',
    styleUrls: ['./posts-list-page.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterModule]
})
export class PostsListPageComponent {
  @HostBinding('class') classes = 'full-size';

  public loading$ = this.store.select(selectLoading);
  public posts$ = this.store.select(selectPosts);

  public page = 1;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

      this.activatedRoute.queryParams.subscribe(({ page, search }) => {
        console.log('page:');
        console.log(page);
        this.page = page || 1;
        this.store.dispatch(loadMorePosts({ params: {
          paginate: {
            page: +this.page,
            limit: 20,
          },
          search: { q: "" }
        } }));
      });
  }

  public pageChanged(page: number): void {
    console.log(page);
    this.page = page;

    this.router.navigate([],
      {
        relativeTo: this.activatedRoute,
        queryParams: {
          page,
        },
        queryParamsHandling: 'merge',
      });
  }
}
