import { createReducer, on } from "@ngrx/store";
import { addPost, loadPostsSuccess } from "./actions.state";
import { initialState } from "./models.state";


// use immerjs later
export const postsReducer = createReducer(
  initialState,
  on(addPost, (state, { title, body }) => ({ ...state, posts: [...state.posts, { title, body }] })),
  on(loadPostsSuccess, (state, { posts }) => ({ ...state, posts: [...state.posts, ...posts] })),
);
