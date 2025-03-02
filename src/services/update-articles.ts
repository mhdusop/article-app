import { Articles } from "@/api/articles";
import { Http } from "@/configs/http";
import { Response } from "@/interfaces/response";

interface UpdatePayload {
   id: number;
   title: string;
   content: string;
}

export const updateArticle = async (payload: UpdatePayload): Promise<UpdatePayload> => {
   try {
      const res = await Http.put<Response<UpdatePayload>>(
         Articles.UpdateArticle(payload.id),
         { title: payload.title, content: payload.content },
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );

      return res.data.data;
   } catch (error) {
      console.error("Error updating article:", error);
      throw error;
   }
};
