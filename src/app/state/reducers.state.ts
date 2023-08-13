import { createReducer, on } from "@ngrx/store";
import { addPost, addPostSuccess, deletePostSuccess, editPostSuccess, loadMorePosts, loadPost, loadPostSuccess, loadPostsSuccess, loadingError } from "./actions.state";
import { initialState } from "./models.state";

export const postsReducer = createReducer(
  initialState,
  on(loadingError, state => ({ ...state, loading: false, posts: []})),
  on(addPost, (state, { title, body }) => ({ ...state, posts: [...state.posts, { title, body }] })),
  on(loadMorePosts, (state, { clear }) => ({
    ...state,
    loading: true,
    posts: state.posts,
  })),
  on(loadPostsSuccess, (state, { posts }) => {

    const allPosts = [...state.posts, ...posts];
    const custom = allPosts.filter(post => post.id! > 100).sort((a, b) => b.id! - a.id!);
    const other = allPosts.filter(post => post.id! <= 100).sort((a, b) => a.id! - b.id!);
    return {
      ...state,
      pagesLoaded: state.pagesLoaded + 1,
      posts: [...custom, ...other].filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i),
      loading: false
    }
  }),
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
  on(addPostSuccess, (state, { post }) => ({
    ...state,
    posts: [...state.posts, post],
  })),
  on(editPostSuccess, (state, { post }) => ({
    ...state,
    posts: [...state.posts, post],
  })),
  on(deletePostSuccess, (state, { id }) => ({
    ...state,
    // posts: [...state.posts, post],
  })),
);
