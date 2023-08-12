import { createSelector } from '@ngrx/store';
import { AppState } from './models.state';


export const selectState = (state: AppState) => state.state;
export const selectPosts = createSelector(selectState, state => state.posts);
