import { Articles } from "@/api/articles";
import { Http } from "@/configs/http";
import { Response } from "@/interfaces/response";

interface CreatePayload {
   title: string;
   content: string;
}

interface ArticleResponse {
   id: number;
   title: string;
   content: string;
   author: number;
   status: number;
   created_at: string;
   updated_at: string;
}

export const createArticle = async (payload: CreatePayload): Promise<ArticleResponse> => {
   try {
      const res = await Http.post<Response<ArticleResponse>>(
         Articles.CreateArticle(), 
         payload,
         {
            headers: {
               "Content-Type": "application/json",
            }
         }
      );

      return res.data.data;
   } catch (error) {
      console.error('Error creating article:', error);
      throw error;
   }
};