import { updateArticle } from "@/services/update-articles";
import { useMutation } from "react-query";

export const useUpdateArticle = () => {
   return useMutation({
      mutationFn: updateArticle,
   });
};