import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forEach } from 'lodash';
import { Observable } from 'rxjs';

import { Post, PostFilter } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public postUrl = 'api/post/';

  constructor(private http: HttpClient) {}

  public getPostByTitle(title: string): Observable<Post> {
    return this.http.get<Post>(`${this.postUrl}${title}`);
  }

  public getPosts(filter: PostFilter): Observable<Post[]> {
    const options = { params: new HttpParams() };
    if (filter.title) {
      options.params = options.params.set('title', `${filter.title}`);
    }
    if (filter.limit) {
      options.params = options.params.set('limit', `${filter.limit}`);
    }
    return new Observable<Post[]>((subscriber) => {
      this.http.get<Post[]>(`${this.postUrl}`, options).subscribe(
        (posts: Post[]) => {
          forEach(posts, (post: Post) => {
            post.publishDate = new Date(post.publishDate);
            if (post.editDate) {
              post.editDate = new Date(post.editDate);
            }
          });
          subscriber.next(posts);
        },
        (error) => {
          subscriber.error(error);
        },
      )
    });
  }
}
