import { createAction, props } from '@ngrx/store';
import { Post, QueryPostsParams } from './models.state';

export const addPost = createAction('Add post', props<{ title: string, body: string }>());

export const loadPostsSuccess = createAction('Load posts success', props<{ posts: Post[] }>());

export const loadPosts = createAction('Load all posts', props<{ params?: QueryPostsParams }>());
