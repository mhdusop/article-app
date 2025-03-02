import { getArticles } from "@/services/get-articles";
import { useQuery } from "react-query"

export function useGetArticles(search: string, page: number, page_size: number) {
   return useQuery({
      queryKey: ["articles", search, page, page_size],
      queryFn: () => getArticles({ search, page, page_size }),
      keepPreviousData: true,
   });
}