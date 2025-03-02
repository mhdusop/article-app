import { Article } from "./articles";
import { PageInfo } from "./page-info";

export interface Data {
   content: string;
   title: string;
   articles: Article[];
   page_info: PageInfo;
};