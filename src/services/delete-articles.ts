import { Articles } from "@/api/articles"
import { Http } from "@/configs/http"

export async function deleteArticles(id: number): Promise<void> {
   try {
      await Http.delete(Articles.DeleteArticle(id), {
         headers: {
            "Content-Type": "application/json",
         }
      })
   } catch (error) {
      console.error(error)
      throw error
   }
}