import { Author } from "./author";

export interface Article {
   id: number;
   title: string;
   content: string;
   author: Author;
   status: number;
   created_at: string;
   updated_at: string;
   like_count: number;
   dislike_count: number;
};