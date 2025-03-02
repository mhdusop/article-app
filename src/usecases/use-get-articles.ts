import { getArticles } from "@/services/get-articles";
import { useQuery } from "react-query"

export const useGetArticles = () => {
   return useQuery({
      queryKey: ['get-articles'],
      queryFn: getArticlesData,
      retry: 1
  });
}

const getArticlesData = async () => {
   const data = await getArticles()
   return data
}