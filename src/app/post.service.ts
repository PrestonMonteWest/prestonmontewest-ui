import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forEach } from 'lodash';

import { Post } from './post';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  public postUrl = 'api/post/';

  constructor(private http: HttpClient) { }

  public getPostByTitle(title: string): Observable<Post> {
    return this.http.get<Post>(`${this.postUrl}${title}`);
  }

  public getPosts(limit?: number): Observable<Post[]> {
    let options: { params?: HttpParams } = {};
    if (limit) {
      options.params = new HttpParams().set('limit', `${limit}`);
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
