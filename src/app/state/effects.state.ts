import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Apollo, gql } from "apollo-angular";
import { exhaustMap, map, catchError, EMPTY, of, switchMap, take } from "rxjs";
import { AppState, GetPostResult, GetPostsResult } from "./models.state";
import { loadPostSuccess, loadPostsSuccess } from "./actions.state";
import { Store } from "@ngrx/store";
import { selectPagesLoaded, selectPost, selectPosts } from "./selectors.state";


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
    exhaustMap(({ id }) => this.post$.pipe(
      take(1),
      switchMap(post => {
        if (post) {
          return of(loadPostSuccess({ post }));
        }

        return this.apollo.query<GetPostResult>({ query: GET_POST, variables: { id }})
        .pipe(
          graphQLRes(),
          map(post => loadPostSuccess({ post: post.post })),
          catchError(() => EMPTY)
        )
      })))
    )
  );

  private post$ = this.store.select(selectPost);
  private pagesLoaded$ = this.store.select(selectPagesLoaded);

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private apollo: Apollo,
  ) {

  }
}
