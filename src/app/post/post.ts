import { PostCategory } from "@prestonmontewest/entities";

export interface PostFilter {
  title?: string;
  limit?: number;
  category?: PostCategory;
}
