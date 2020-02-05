export interface Post {
  title: string;
  summary: string;
  publishDate: Date;
  editDate?: Date;
  image: string;
  content: string;
}

export interface PostFilter {
  title?: string;
  limit?: number;
}
