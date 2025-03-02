import { useQuery } from "react-query";
import { getArticlesById } from "@/services/get-articles-id";

export const useGetArticleById = (id?: number) => {
   return useQuery(["article", id], () => id ? getArticlesById(id) : null, {
      enabled: !!id,
   });
};