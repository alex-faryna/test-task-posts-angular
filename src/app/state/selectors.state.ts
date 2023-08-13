import { createSelector } from '@ngrx/store';
import { AppState } from './models.state';

export const selectState = (state: AppState) => state.state;
export const selectPostId = createSelector(selectState,  state => state.selectedPost);
export const selectPosts = createSelector(selectState, state => state.posts); // add filtering by search
export const selectPost = createSelector(selectPosts, selectPostId, (posts, id) => posts.find(val => val.id === id));
export const selectLoading = createSelector(selectState, state => state.loading);
export const selectPagesLoaded = createSelector(selectState, state => state.pagesLoaded);
