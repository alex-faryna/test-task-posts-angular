import { State, createSelector } from '@ngrx/store';
import { AppState, PostsState } from './reducers.state';

export const selectState = (state: AppState) => state.state;
export const selectPosts = createSelector(selectState, state => state.posts);
