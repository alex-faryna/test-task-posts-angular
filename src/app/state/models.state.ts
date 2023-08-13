export interface Post {
  id?: number;
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
  pagesLoaded: number;
  selectedPost?: number;
}

export const initialState: PostsState = {
  posts: [],
  total: 0,
  pagesLoaded: 1,
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

export interface GetPostResult {
  post: Post
}

export interface GetCreatePostResult {
  createPost: Post
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
