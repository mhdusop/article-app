import { useMutation } from "react-query";
import { deleteArticles } from "@/services/delete-articles";

export const useDeleteArticles = () => {
   return useMutation({
      mutationKey: ["delete-article"],
      mutationFn: async (id: number) => {
         if (!id) throw new Error("ID is required");
         return await deleteArticles(id);
      },
   });
};