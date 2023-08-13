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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterModule],
})
export class HeaderComponent {

  public post$ = this.store.select(selectPost);

  public postForm = new FormGroup({
    title: new FormControl(''),
    body: new FormControl('')
  });

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {


    this.post$.pipe(filter(Boolean)).subscribe((post: Post) => {
      const { title, body } = post;
      this.postForm.patchValue({ title, body });
    });
  }
}