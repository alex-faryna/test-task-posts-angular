import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Apollo, gql } from "apollo-angular";
import { exhaustMap, map, catchError, EMPTY, of, switchMap, take, switchScan } from "rxjs";
import { AppState, GetCreatePostResult, GetPostResult, GetPostsResult, GetUpdatePostResult } from "./models.state";
import { addPostSuccess, deletePostSuccess, editPostSuccess, loadPostSuccess, loadPostsSuccess, loadingError } from "./actions.state";
import { Store } from "@ngrx/store";
import { selectPagesLoaded, selectPost, selectPostId, selectPosts } from "./selectors.state";
import { Router } from "@angular/router";


const GET_ALL_POSTS = gql`
  query (
    $options: PageQueryOptions
  ) {
    posts(options: $options) {
      data {
        id
        title
        body
      }
    }
  }
`;

const GET_POST = gql`
  query (
    $id: ID!
  ) {
    post(id: $id) {
      id
      title
      body
    }
  }
`;

const ADD_POST = gql`
  mutation (
    $input: CreatePostInput!
  ) {
    createPost(input: $input) {
      id
      title
      body
    }
  }
`;

const EDIT_POST = gql`
  mutation (
    $id: ID!,
    $input: UpdatePostInput!
  ) {
    updatePost(id: $id, input: $input) {
      id
      body
    }
  }
`;

const DELETE_POST = gql`
  mutation (
    $id: ID!
  ) {
    deletePost(id: $id)
  }
`;

const graphQLRes = <T>() => {
  return map((res: { data: T }) => res.data);
}

@Injectable()
export class PostsEffects {

  loadAllPosts$ = createEffect(() => this.actions$.pipe(
    ofType('Load all posts'),
    exhaustMap(() => this.pagesLoaded$.pipe(
      take(1),
      switchMap(page => {
        return this.apollo.query<GetPostsResult>({ query: GET_ALL_POSTS, variables: { options: { paginate: { page, limit: 20 } } }})
        .pipe(
          graphQLRes(),
          map(posts => loadPostsSuccess({ posts: posts.posts.data })),
          catchError(() => EMPTY)
        )
      })))
    )
  );

  loadPost$ = createEffect(() => this.actions$.pipe(
    ofType('Load post by id'),
    exhaustMap(() => this.post$.pipe(
      take(1),
      switchMap(post => {

        console.log(post);
        if (post) {
          return of(loadPostSuccess({ post }));
        }

        return this.postId$.pipe(switchMap(id => this.apollo.query<GetPostResult>({ query: GET_POST, variables: { id }})
        .pipe(
          graphQLRes(),
          map(post => {
            if (post.post.id) {
              return loadPostSuccess({ post: post.post });
            }
            void this.router.navigate(['/posts']);
            return loadingError();
          }),
          catchError(() => {
            void this.router.navigate(['/posts']);
            return EMPTY;
          })
        )))
      })))
    )
  );

  addPost$ = createEffect(() => this.actions$.pipe(
    ofType('Add post'),
    exhaustMap(({ title, body }) => {
      return this.apollo.mutate<GetCreatePostResult>({ mutation: ADD_POST, variables: { input: { title, body } }})
      .pipe(
        map(post => addPostSuccess({ post: post.data?.createPost! })),
        catchError(() => EMPTY),
      );
    }
  )));


  editPost$ = createEffect(() => this.actions$.pipe(
    ofType('Edit post'),
    exhaustMap(({ id, title, body }) => {
      return this.apollo.mutate<GetUpdatePostResult>({ mutation: EDIT_POST, variables: { id, input: { body } }})
      .pipe(
        map(post => editPostSuccess({ post: post.data?.updatePost! })),
        catchError(() => EMPTY),
      );
    }
  )));

  deletePost$ = createEffect(() => this.actions$.pipe(
    ofType('Delete post'),
    exhaustMap(({ id }) => {
      return this.apollo.mutate({ mutation: DELETE_POST, variables: { id }})
      .pipe(
        map(() => deletePostSuccess({ id })),
        catchError(() => EMPTY),
      );
    }
  )));

  private post$ = this.store.select(selectPost);
  private postId$ = this.store.select(selectPostId);
  private pagesLoaded$ = this.store.select(selectPagesLoaded);

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private apollo: Apollo,
    private router: Router,
  ) { }
}
