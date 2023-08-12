export interface Post {
  id?: string | number;
  title: string;
  body: string;
}

export interface AppState {
  state: PostsState;
}

export interface PostsState {
  posts: Post[];
}

export const initialState: PostsState = {
  posts: []
};

export interface Page {
  page: number;
  limit: number;
}

export interface QueryPostsParams {
  paginate?: Page,
  search?: {
    q: string;
  }
}

export interface GetPostsResult {
  posts: {
    data: Post[],

  }
}
