import { createAction, props } from '@ngrx/store';
import { Post } from './reducers.state';

export const addPost = createAction(
  'Add post',
  props<{ title: string, body: string }>()
);

export const addPosts = createAction(
  'Add posts',
  props<{ posts: Post[] }>()
);
