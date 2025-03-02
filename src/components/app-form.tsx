import { useCreateArticle } from "@/usecases/use-create-articles";
import { useUpdateArticle } from "@/usecases/use-update-articles";
import { useArticleStore } from "@/stores/useArticleStore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useEffect } from "react";
import { useGetArticleById } from "@/usecases/use-get-articles-id";

interface AppFormProps {
   setShowForm: (show: boolean) => void;
}

export function AppForm({ setShowForm }: AppFormProps) {
   const { id, title, content, setArticle, resetArticle } = useArticleStore();
   const { mutate: createArticle, isLoading: isCreating } = useCreateArticle();
   const { mutate: updateArticle, isLoading: isUpdating } = useUpdateArticle();
   const { data: articleData, isLoading: isFetching } = useGetArticleById(id);

   // Jika mode edit, isi form dengan data dari API
   useEffect(() => {
      if (articleData) {
         setArticle({ title: articleData.title, content: articleData.content });
      }
   }, [articleData, setArticle]);

   const handleSubmit = () => {
      if (!title || !content) {
         alert("Title and Content are required!");
         return;
      }

      if (id) {
         updateArticle(
            { id, title, content },
            {
               onSuccess: () => {
                  resetArticle();
                  setShowForm(false);
               },
               onError: (error) => {
                  console.error(error);
               },
            }
         );
      } else {
         createArticle(
            { title, content },
            {
               onSuccess: () => {
                  resetArticle();
                  setShowForm(false);
               },
               onError: (error) => {
                  console.error(error);
               },
            }
         );
      }
   };

   return (
      <div className="p-4 bg-white rounded-md shadow-md">
         <h1 className="text-2xl font-bold">{id ? "Edit Article" : "Create Article"}</h1>
         {isFetching && <p>Loading article data...</p>}
         <div className="my-4">
            <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
               <Label htmlFor="title">Title</Label>
               <Input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setArticle({ title: e.target.value, content })}
                  placeholder="Input title here"
               />
            </div>
            <div className="grid w-full items-center gap-1.5 mb-4">
               <Label htmlFor="content">Content</Label>
               <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setArticle({ title, content: e.target.value })}
                  placeholder="Input content here"
               />
            </div>
            <div className="flex gap-2">
               <Button onClick={handleSubmit} disabled={isCreating || isUpdating}>
                  {isCreating || isUpdating ? "Saving..." : "Save"}
               </Button>
               <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
               </Button>
            </div>
         </div>
      </div>
   );
}