import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Apollo, gql } from "apollo-angular";
import { exhaustMap, map, catchError, EMPTY, of } from "rxjs";
import { GetPostsResult } from "./models.state";
import { loadPostsSuccess } from "./actions.state";


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
    exhaustMap(({ params }) => this.apollo.query<GetPostsResult>({ query: GET_ALL_POSTS, variables: { options: params }})
      .pipe(
        graphQLRes(),
        map(posts => {
          console.log(posts.posts.data);
          return loadPostsSuccess({ posts: posts.posts.data });
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
