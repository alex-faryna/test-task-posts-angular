import { createAction, props } from '@ngrx/store';
import { Post, QueryPostsParams } from './models.state';

export const loadingError = createAction('Loaded error');
export const loadPostsSuccess = createAction('Load posts success', props<{ posts: Post[] }>());
export const loadMorePosts = createAction('Load all posts', props<{ params?: QueryPostsParams }>());

// CRUD
export const searchPosts = createAction('Search', props<{ query: string }>());

export const addPost = createAction('Add post', props<{ title: string, body: string }>());
export const editPost = createAction('Edit post', props<{ id: number, title: string, body: string }>());
export const deletePost = createAction('Delete post', props<{ id: number }>());

