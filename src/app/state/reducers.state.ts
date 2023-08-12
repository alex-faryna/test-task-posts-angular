import { createReducer, on } from "@ngrx/store";
import { addPost, loadMorePosts, loadPostsSuccess, loadingError } from "./actions.state";
import { initialState } from "./models.state";

export const postsReducer = createReducer(
  initialState,
  on(loadingError, state => ({ ...state, loading: false, posts: []})),
  on(addPost, (state, { title, body }) => ({ ...state, posts: [...state.posts, { title, body }] })),
  on(loadMorePosts, state => ({ ...state, loading: true})),
  on(loadPostsSuccess, (state, { posts }) => ({ ...state, posts: [...state.posts, ...posts], loading: false })),
);
