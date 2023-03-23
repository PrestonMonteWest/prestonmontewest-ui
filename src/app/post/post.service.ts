import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'prestonmontewest-entities';
import { Observable } from 'rxjs';

export interface PostFilter {
  title?: string;
  limit?: number;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly postApiUrl = '/api/posts';

  constructor(private readonly http: HttpClient) {}

  getPostByTitle(title: string): Observable<Post> {
    return this.http.get<Post>(`${this.postApiUrl}/${title}`);
  }

  getPosts(filter: PostFilter): Observable<Post[]> {
    const options = { params: new HttpParams() };
    if (filter.title) {
      options.params = options.params.set('title', `${filter.title}`);
    }
    if (filter.limit) {
      options.params = options.params.set('limit', `${filter.limit}`);
    }
    return this.http.get<Post[]>(this.postApiUrl, options);
  }

  createPost(data: FormData): Observable<Post> {
    return this.http.post<Post>(this.postApiUrl, data);
  }
}
