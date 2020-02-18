export class Post {
  constructor(
    public title: string,
    public summary: string,
    public content: string,
    public image: string,
    public publishDate?: Date,
    public editDate?: Date
  ) {}
}

export interface PostFilter {
  title?: string;
  limit?: number;
}
