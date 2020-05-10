export interface BasePost {
  title: string;
  summary: string;
  content: string;
}

export interface PostCreate extends BasePost {
  image: File;
}

export interface PostDisplay extends BasePost {
  image: string;
  publishDate: Date;
  editDate?: Date;
  viewCount: number;
}

export interface PostFilter {
  title?: string;
  limit?: number;
}
