import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map as lodashMap } from 'lodash';
import { Observable } from 'rxjs';

import { Post, PostFilter } from './post';
import { map as rxjsMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postApiUrl = '/api/post/';

  constructor(private http: HttpClient) {}

  getPostByTitle(title: string): Observable<Post> {
    return this.http.get<Post>(`${this.postApiUrl}${title}`);
  }

  getPosts(filter: PostFilter): Observable<Post[]> {
    const options = { params: new HttpParams() };
    if (filter.title) {
      options.params = options.params.set('title', `${filter.title}`);
    }
    if (filter.limit) {
      options.params = options.params.set('limit', `${filter.limit}`);
    }
    return this.http.get<Post[]>(`${this.postApiUrl}`, options).pipe(
      rxjsMap((posts: Post[]) => lodashMap(posts, (post: Post) => {
          post.publishDate = new Date(post.publishDate as unknown as string);
          if (post.editDate) {
            post.editDate = new Date(post.editDate as unknown as string);
          }
          return post;
        }))
    );
  }

  createPost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.postApiUrl}`, post);
  }
}
