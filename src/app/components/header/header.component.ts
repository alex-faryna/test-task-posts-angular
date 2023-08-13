import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, takeUntil } from 'rxjs';
import { loadPost } from 'src/app/state/actions.state';
import { AppState, Post } from 'src/app/state/models.state';
import { selectPost, selectPosts } from 'src/app/state/selectors.state';
import {Location} from '@angular/common';
import { UnsubscribeService } from 'src/app/utils/destroy.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [UnsubscribeService],
})
export class HeaderComponent {

  @Output() public search = new EventEmitter<string>();
  @Output() public clear = new EventEmitter();

  public post$ = this.store.select(selectPost);
  public showSearch$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(() => this.location.path() === '/posts'));

  public postForm = new FormGroup({
    title: new FormControl(''),
    body: new FormControl('')
  });

  public searchControl = new FormControl('');

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private unsub$: UnsubscribeService,
    public location: Location,
  ) {

    this.post$.pipe(
      filter(Boolean),
      takeUntil(this.unsub$)
    ).subscribe((post: Post) => {
      const { title, body } = post;
      this.postForm.patchValue({ title, body });
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      takeUntil(this.unsub$),
    ).subscribe(value => this.search.emit(value || ''));
  }
}
