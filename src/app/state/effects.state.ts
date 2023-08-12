import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Apollo, gql } from "apollo-angular";
import { exhaustMap, map, catchError, EMPTY, of } from "rxjs";


const GET_ALL_POSTS = gql`
  query (
    $options: PageQueryOptions
  ) {
    posts(options: $options) {
      data {
        id
        title
      }
      links {
        first {
          ...Page
        }
        prev {
          ...Page
        }
        next {
          ...Page
        }
        last {
          ...Page
        }
      }
      meta {
        totalCount
      }
    }
  }

  fragment Page on PageLimitPair{
    page
    limit
  }
`;

const graphQLRes = <T>() => {
  return map((res: { data: T }) => res.data);
}

@Injectable()
export class PostsEffects {

  loadAllPosts$ = createEffect(() => this.actions$.pipe(
    ofType('Load all posts'),
    exhaustMap(({ params }) => this.apollo.query({ query: GET_ALL_POSTS, variables: { options: params }})
      .pipe(
        graphQLRes(),
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
