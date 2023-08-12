import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
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
  @ViewChild('observe', { static: true }) observeElement!: ElementRef;

  public loading$ = this.store.select(selectLoading);
  public posts$ = this.store.select(selectPosts);

  public page = 1;

  constructor(private store: Store<AppState>) { }

  public ngOnInit(): void {
    this.loadMore();
    this.initObserver();
  }

  private loadMore(): void {
    this.store.dispatch(loadMorePosts({ params: {
      paginate: {
        page: +this.page,
        limit: 20,
      },
      search: { q: "" }
    } }));
  }

  private initObserver(): void {
    const observer = new IntersectionObserver((entries: unknown, observer: unknown) => {
      console.log(entries)
    }, { threshold: 1.0 });

    observer.observe(this.observeElement.nativeElement);

    console.log(observer);
  }
}
