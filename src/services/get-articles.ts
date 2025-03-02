import { Articles } from "@/api/articles"
import { Http } from "@/configs/http"
import { Data } from "@/interfaces/data"
import { Response } from "@/interfaces/response"

export async function getArticles(): Promise<Data> {
   try {
      const res = await Http.get<Response<Data>>(Articles.GetArticles(), {
         headers: {
            "Content-Type": "application/json",
         }
      })
   
      return res.data.data
   } catch (error) {
      console.error(error)
      throw error
   }
}