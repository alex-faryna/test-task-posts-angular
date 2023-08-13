import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { deletePost, loadMorePosts } from 'src/app/state/actions.state';
import { AppState } from 'src/app/state/models.state';
import { selectLoading, selectPosts } from 'src/app/state/selectors.state';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BehaviorSubject, Subject, debounceTime, filter, switchMap, takeUntil, tap } from 'rxjs';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { UnsubscribeService } from 'src/app/utils/destroy.service';

@Component({
    selector: 'app-posts-list-page',
    templateUrl: './posts-list-page.component.html',
    styleUrls: ['./posts-list-page.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterModule, LoaderComponent],
    providers: [UnsubscribeService],
})
export class PostsListPageComponent {
  @HostBinding('class') classes = 'full-size';
  @ViewChild('observe', { static: true }) observeElement!: ElementRef;

  public loading$ = this.store.select(selectLoading);
  public posts$ = this.store.select(selectPosts);

  public page = 1;

  private observedSubject = new Subject();
  private observe$ = this.posts$.pipe(
    filter(posts => !!posts.length),
    switchMap(() => this.observedSubject),
    filter(Boolean),
    debounceTime(100),
    takeUntil(this.unsub$),
   );

  constructor(
    private store: Store<AppState>,
    private unsub$: UnsubscribeService,
  ) { }

  public ngOnInit(): void {
    this.loadMore(true);
    this.initObserver();
    this.observe$.subscribe(() => this.loadMore());

    this.store.select(selectPosts).subscribe(console.dir);
  }

  private loadMore(clear = false): void {
    this.store.dispatch(loadMorePosts({ clear }));
  }

  private initObserver(): void {
    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      console.log('Intersect');
      if (entries && entries.length) {
        this.observedSubject.next(entries[0]?.intersectionRatio || 0);
      }
    }, { threshold: 1 });
    observer.observe(this.observeElement.nativeElement);
  }

  public clickDelete(id: number): void {
    this.store.dispatch(deletePost({ id }));
  }
}
