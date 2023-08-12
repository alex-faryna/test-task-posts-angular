import { createSelector } from '@ngrx/store';
import { AppState } from './models.state';

export const selectState = (state: AppState) => state.state;
export const selectPosts = createSelector(selectState, state => state.posts); // add filtering
export const selectLoading = createSelector(selectState, state => state.loading);
export const selectPagesLoaded = createSelector(selectState, state => state.pagesLoaded);
