import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, startWith, switchMap, takeUntil } from 'rxjs';
import { addPost, editPost, loadPost } from 'src/app/state/actions.state';
import { AppState, Post } from 'src/app/state/models.state';
import { selectPost, selectPosts } from 'src/app/state/selectors.state';
import { UnsubscribeService } from 'src/app/utils/destroy.service';


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [UnsubscribeService],
})
export class EditPageComponent {

  public post$ = this.store.select(selectPost);
  public id = 0;
  public postForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    body: new FormControl('')
  });

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private unsub$: UnsubscribeService,
    private cdr: ChangeDetectorRef,
    private router: Router) {
      this.postForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(3)]),
        body: new FormControl('')
      });

    this.route.params.pipe(
      map(({ id }) => +id),
      takeUntil(this.unsub$)
    ).subscribe(id => {
      if (id > 0) {
        this.store.dispatch(loadPost({ id: +id }));
      } else {
        this.postForm.reset();
        this.postForm.updateValueAndValidity();

        this.postForm.get('title')?.enable();
        this.id === 0;
        this.cdr.markForCheck();
      }
    });

    this.postForm.valueChanges.pipe(startWith(this.postForm.value)).subscribe(console.log);

    this.post$.pipe(
      filter(Boolean),
      takeUntil(this.unsub$),
    ).subscribe((post: Post) => {
      const { id, title, body } = post;
      this.postForm.patchValue({ title, body });
      this.postForm.get('title')?.disable();
      this.id = +(id || 0);
    });
  }

  public save(): void {
    const { title, body } = this.postForm.value;
      if (this.id) {
        this.store.dispatch(editPost({
          id: +this.id,
          title: title || '',
          body: body || '',
        }));
      } else {
        this.store.dispatch(addPost({
          title: title || '',
          body: body || '',
        }));
      }
      void this.router.navigate(['/posts']);
  }
}
