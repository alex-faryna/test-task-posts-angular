import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Apollo, gql } from "apollo-angular";
import { exhaustMap, map, catchError, EMPTY } from "rxjs";


const GET_ALL_POSTS = gql`
  query (
    $options: PageQueryOptions
  ) {
    posts(options: $options) {
      data {
        id
        title
      }
      meta {
        totalCount
      }
    }
  }
`;

@Injectable()
export class PostsEffects {

  loadAllPosts$ = createEffect(() => this.actions$.pipe(
    ofType('Load all posts'),
    exhaustMap(() => this.apollo.query({ query: GET_ALL_POSTS, variables: {
      "options": {
        "paginate": {
          "page": 1,
          "limit": 5
        }
      }
    } })
      .pipe(
        map(posts => {
          console.log(posts);
          return ({ type: 'Load all posts success', payload: [] });
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private apollo: Apollo,
  ) {}
}
