"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/base/sidebar/app-sidebar";
import { AppHeader } from "@/components/base/header/app-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
   Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { ArrowLeft, Pencil, Plus, Search, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppForm } from "@/components/app-form";
import { useArticleStore } from "@/stores/useArticleStore";
import { useGetArticles } from "@/usecases/use-get-articles";
import { useDeleteArticles } from "@/usecases/use-delete-articles";
import { AppDialog } from "@/components/app-dialog";

export default function Page() {
   const { data, isLoading, error } = useGetArticles();
   const { setArticle, resetArticle } = useArticleStore();
   const { mutate: deleteArticle, isLoading: isDeleting } = useDeleteArticles();

   const [showForm, setShowForm] = useState(false);
   const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
   const [isDialogOpen, setDialogOpen] = useState(false);

   if (isLoading) return <p className="text-center text-gray-500">Loading articles...</p>;
   if (error) return <p className="text-center text-red-500">Error loading articles</p>;

   const handleDeleteConfirm = () => {
      if (selectedArticle) {
         deleteArticle(selectedArticle, {
            onSuccess: () => setDialogOpen(false),
         });
      }
   };

   return (
      <>
         <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
               <AppHeader />
               <main className="flex flex-1 flex-col gap-4 p-4 bg-gray-50">
                  <div className="bg-white rounded p-6">
                     <div className="flex justify-between mb-4 ps-5">
                        <div className="flex items-center">
                           <Search size={17} color="#939393" />
                           <Input className="border-0 focus-visible:ring-0 shadow-none" placeholder="Type here to search" />
                        </div>
                        <div>
                           <Button
                              onClick={() => {
                                 if (showForm) {
                                    resetArticle();
                                 } else {
                                    setArticle({ title: "", content: "" });
                                 }
                                 setShowForm(!showForm);
                              }}
                           >
                              {showForm ? (
                                 <div className="flex items-center gap-1">
                                    <ArrowLeft />
                                    Back
                                 </div>
                              ) : (
                                 <div className="flex items-center gap-1">
                                    <Plus />
                                    Add
                                 </div>
                              )}
                           </Button>
                        </div>
                     </div>

                     {showForm ? (
                        <AppForm setShowForm={setShowForm} />
                     ) : (
                        <Table>
                           <TableHeader className="bg-[#51B15C0A]">
                              <TableRow>
                                 <TableHead className="text-center text-primary">No</TableHead>
                                 <TableHead className="text-primary">Date</TableHead>
                                 <TableHead className="text-primary">Title</TableHead>
                                 <TableHead className="text-primary">Content</TableHead>
                                 <TableHead className="text-center text-primary">Action</TableHead>
                              </TableRow>
                           </TableHeader>
                           <TableBody>
                              {data?.articles.length ? (
                                 data.articles.map((article, index) => (
                                    <TableRow key={article.id}>
                                       <TableCell className="text-center">{index + 1}</TableCell>
                                       <TableCell>{article.created_at}</TableCell>
                                       <TableCell>{article.title}</TableCell>
                                       <TableCell>{article.content.substring(0, 50)}...</TableCell>
                                       <TableCell className="text-center gap-1 flex justify-center">
                                          <Button
                                             className="bg-yellow-500 hover:bg-yellow-600 rounded-full w-8 h-8"
                                             onClick={() => {
                                                setArticle(article);
                                                setShowForm(true);
                                             }}
                                          >
                                             <Pencil />
                                          </Button>
                                          <Button
                                             className="bg-red-500 hover:bg-red-600 rounded-full w-8 h-8"
                                             onClick={() => {
                                                setSelectedArticle(article.id);
                                                setDialogOpen(true);
                                             }}
                                             disabled={isDeleting}
                                          >
                                             <Trash />
                                          </Button>
                                       </TableCell>
                                    </TableRow>
                                 ))
                              ) : (
                                 <TableRow>
                                    <TableCell colSpan={5} className="text-center py-4">
                                       No articles found
                                    </TableCell>
                                 </TableRow>
                              )}
                           </TableBody>
                           <TableFooter />
                        </Table>
                     )}
                  </div>
               </main>
            </SidebarInset>
         </SidebarProvider>

         <AppDialog
            isOpen={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            onConfirm={handleDeleteConfirm}
            isLoading={isDeleting}
         />
      </>
   );
}