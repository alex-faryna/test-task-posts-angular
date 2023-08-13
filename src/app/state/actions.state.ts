import { createAction, props } from '@ngrx/store';
import { Post, QueryPostsParams } from './models.state';

export const loadingError = createAction('Loaded error');
export const searchPosts = createAction('Search', props<{ query: string }>());

export const loadPost = createAction('Load post by id', props<{ id: number }>());
export const loadMorePosts = createAction('Load all posts', props<{ clear?: boolean }>());

export const loadPostSuccess = createAction('Load post success', props<{ post: Post }>());
export const loadPostsSuccess = createAction('Load posts success', props<{ posts: Post[] }>());

// CRUD
export const addPost = createAction('Add post', props<{ title: string, body: string }>());
export const editPost = createAction('Edit post', props<{ id: number, title: string, body: string }>());
export const deletePost = createAction('Delete post', props<{ id: number }>());

export const addPostSuccess = createAction('Add post success', props<{ post: Post }>());
export const editPostSuccess = createAction('Edit post success', props<{ post: Post }>());
export const deletePostSuccess = createAction('Delete post success', props<{ id: number }>());

