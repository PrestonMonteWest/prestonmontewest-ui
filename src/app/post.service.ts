import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    const params = new HttpParams();
    if (limit) {
      params.set('limit', `${limit}`);
    }
    return this.http.get<Post[]>(`${this.postUrl}`, { params })
  }
}
