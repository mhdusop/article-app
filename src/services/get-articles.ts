import { Articles } from "@/api/articles";
import { Http } from "@/configs/http";
import { Data } from "@/interfaces/data";
import { Response } from "@/interfaces/response";

interface GetArticlesParams {
   search?: string;
   page: number;
   page_size: number;
}

export async function getArticles({ search = "", page, page_size }: GetArticlesParams): Promise<Data> {
   try {
      const res = await Http.get<Response<Data>>(Articles.GetArticles(), {
         params: {
            search,
            page,
            page_size,
         },
         headers: {
            "Content-Type": "application/json",
         },
      });

      return res.data.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
}