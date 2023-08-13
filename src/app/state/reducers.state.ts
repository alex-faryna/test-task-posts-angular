import { createReducer, on } from "@ngrx/store";
import { addPost, loadMorePosts, loadPost, loadPostSuccess, loadPostsSuccess, loadingError } from "./actions.state";
import { initialState } from "./models.state";

export const postsReducer = createReducer(
  initialState,
  on(loadingError, state => ({ ...state, loading: false, posts: []})),
  on(addPost, (state, { title, body }) => ({ ...state, posts: [...state.posts, { title, body }] })),
  on(loadMorePosts, state => ({ ...state, loading: true})),
  on(loadPostsSuccess, (state, { posts }) => ({
    ...state,
    pagesLoaded: state.pagesLoaded + 1,
    posts: [...state.posts, ...posts],
    loading: false
  })),
  on(loadPost, (state, { id }) => ({
    ...state,
    selectedPost: id,
    loading: true,
  })),
  on(loadPostSuccess, (state, { post }) => ({
    ...state,
    posts: state.posts.length ? state.posts : [post],
    selectedPost: post.id as number,
  })),
);
