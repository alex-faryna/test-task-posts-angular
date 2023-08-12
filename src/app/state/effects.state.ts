import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Apollo, gql } from "apollo-angular";
import { exhaustMap, map, catchError, EMPTY } from "rxjs";


const GET_ALL_POSTS = gql`
  {
    posts {
      data {
        id
        title
        body
      }
      links {
        first {
          page
          limit
        }
      }
    }
  }
`;

@Injectable()
export class PostsEffects {

  loadAllPosts$ = createEffect(() => this.actions$.pipe(
    ofType('Load all posts'),
    exhaustMap(() => this.apollo.query({ query: GET_ALL_POSTS })
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
