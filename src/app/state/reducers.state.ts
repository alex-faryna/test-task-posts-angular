import { createReducer, on } from "@ngrx/store";
import { addPost, loadPostsSuccess } from "./actions.state";

export interface Post {
  id?: string | number;
  title: string;
  body: string;
}

export interface AppState {
  state: PostsState;
}

export interface PostsState {
  posts: Post[];
}

export const initialState: PostsState = {
  posts: []
};

// use immerjs later
export const postsReducer = createReducer(
  initialState,
  on(addPost, (state, { title, body }) => ({ ...state, posts: [...state.posts, { title, body }] })),
  on(loadPostsSuccess, (state, { posts }) => ({ ...state, posts: [...state.posts, ...posts] })),
);
