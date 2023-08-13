import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, switchMap } from 'rxjs';
import { loadPost } from 'src/app/state/actions.state';
import { AppState, Post } from 'src/app/state/models.state';
import { selectPost, selectPosts } from 'src/app/state/selectors.state';


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
})
export class EditPageComponent {

  public post$ = this.store.select(selectPost);

  public postForm = new FormGroup({
    title: new FormControl(''),
    body: new FormControl('')
  });

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.route.params.subscribe(({ id }) => this.store.dispatch(loadPost({ id })));


    this.post$.pipe(filter(Boolean)).subscribe((post: Post) => {
      const { title, body } = post;
      this.postForm.patchValue({ title, body });
    });
  }
}
