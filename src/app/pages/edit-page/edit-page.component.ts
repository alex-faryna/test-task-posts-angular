import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, startWith, switchMap } from 'rxjs';
import { addPost, editPost, loadPost } from 'src/app/state/actions.state';
import { AppState, Post } from 'src/app/state/models.state';
import { selectPost, selectPosts } from 'src/app/state/selectors.state';


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class EditPageComponent {

  public post$ = this.store.select(selectPost).pipe(startWith(null));
  public id = 0;
  public postForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    body: new FormControl('')
  });

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) {
    this.route.params.pipe(map(({ id }) => +id)).subscribe(id => {
      console.log(id);
      if (id > 0) {
        this.store.dispatch(loadPost({ id: +id }));
      }
    });

    this.post$.pipe(filter(Boolean)).subscribe((post: Post) => {
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
