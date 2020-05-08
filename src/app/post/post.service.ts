import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map as lodashMap } from 'lodash';
import { Observable } from 'rxjs';
import { map as rxjsMap } from 'rxjs/operators';

import { PostDisplay, PostFilter } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postApiUrl = '/api/post';

  constructor(private http: HttpClient) {}

  getPostByTitle(title: string): Observable<PostDisplay> {
    return this.http.get<PostDisplay>(`${this.postApiUrl}/${title}`);
  }

  getPosts(filter: PostFilter): Observable<PostDisplay[]> {
    const options = { params: new HttpParams() };
    if (filter.title) {
      options.params = options.params.set('title', `${filter.title}`);
    }
    if (filter.limit) {
      options.params = options.params.set('limit', `${filter.limit}`);
    }
    return this.http.get<PostDisplay[]>(`${this.postApiUrl}`, options).pipe(
      rxjsMap((posts: PostDisplay[]) => lodashMap(posts, (post: PostDisplay) => {
          post.publishDate = new Date(post.publishDate as unknown as string);
          if (post.editDate) {
            post.editDate = new Date(post.editDate as unknown as string);
          }
          return post;
        }))
    );
  }

  createPost(formData: FormData): Observable<PostDisplay> {
    return this.http.post<PostDisplay>(`${this.postApiUrl}`, formData);
  }
}
