import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Apollo, gql } from "apollo-angular";
import { exhaustMap, map, catchError, EMPTY, of, switchMap, take } from "rxjs";
import { AppState, GetPostsResult } from "./models.state";
import { loadPostsSuccess } from "./actions.state";
import { Store } from "@ngrx/store";
import { selectPagesLoaded } from "./selectors.state";


const GET_ALL_POSTS = gql`
  query (
    $options: PageQueryOptions
  ) {
    posts(options: $options) {
      data {
        id
        title
      }
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
    exhaustMap(({ params }: { params: Record<string, number> }) => this.pagesLoaded$.pipe(
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

  private pagesLoaded$ = this.store.select(selectPagesLoaded);

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private apollo: Apollo,
  ) {

  }
}
