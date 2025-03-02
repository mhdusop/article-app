import { createArticle } from "@/services/create-articles";
import { useMutation } from "react-query";


export const useCreateArticle = () => {
   return useMutation({
      mutationFn: createArticle,
   });
};
