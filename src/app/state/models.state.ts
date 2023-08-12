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
  total: number;
  loading: boolean;
  pages?: {
    first: Page,
    next: Page,
    prev: Page,
    last: Page,
  }
}

export const initialState: PostsState = {
  posts: [],
  total: 0,
  loading: false,
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
    links: {
      first: Page,
      next: Page,
      prev: Page,
      last: Page,
    },
    meta: {
      totalCount: number
    }
  }
}
